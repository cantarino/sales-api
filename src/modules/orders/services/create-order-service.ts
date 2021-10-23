import AppError from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../../customers/domain/repositories/ICustomerRepository";
import { Customer } from "../../customers/infra/typeorm/entities/Customer";
import { IUpdateProductQuantity } from "../../products/domain/models/IUpdateProductQuantity";
import { IProductsRepository } from "../../products/domain/repositories/IProductsRepository";
import { Product } from "../../products/infra/typeorm/entities/Product";
import { ICreateOrder } from "../domain/models/ICreateOrder";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import { Order } from "../infra/typeorm/entities/Order";

@injectable()
export class CreateOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}
  public async execute({
    customer_id,
    products,
  }: ICreateOrder): Promise<Order> {
    const customer = await this.findCustomer(customer_id);
    const productsStock = await this.findProductsAndCheckAvailability(products);

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsStock.filter((p) => p.id === product.id)[0].price,
    }));
    const order = await this.saveOrderAndUpdateStock(
      customer,
      serializedProducts,
      productsStock
    );
    return order;
  }

  private async saveOrderAndUpdateStock(
    customer: Customer,
    serializedProducts: {
      product_id: string;
      price: number;
      quantity: number;
    }[],
    productsStock: Product[]
  ) {
    //check transaction
    const order = await this.ordersRepository.createOrder({
      customer,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updatedProductQuantity = order_products.map((order_product) => ({
      id: order_product.product_id,
      quantity:
        productsStock.filter((p) => p.id === order_product.product_id)[0]
          .quantity - order_product.quantity,
    }));

    await this.productsRepository.updateStock(updatedProductQuantity);
    return order;
  }

  private async findCustomer(customer_id: string) {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError("Could not find any customer with the given id.");
    }
    return customer;
  }

  private async findProductsAndCheckAvailability(
    products: IUpdateProductQuantity[]
  ) {
    const existsProducts = await this.productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError("Could not find any products with the given ids.");
    }

    this.checkInexistentProducts(existsProducts, products);
    this.checkProductsAvailability(existsProducts, products);

    return existsProducts;
  }

  private checkInexistentProducts(
    existsProducts: Product[],
    products: IUpdateProductQuantity[]
  ) {
    const existsProductsIds = existsProducts.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`
      );
    }
  }

  private checkProductsAvailability(
    existsProducts: Product[],
    products: IUpdateProductQuantity[]
  ) {
    const quantityAvailable = products.filter(
      (product) =>
        existsProducts.filter((p) => p.id === product.id)[0].quantity <
        product.quantity
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
             is not available for ${quantityAvailable[0].id}.`
      );
    }
  }
}
