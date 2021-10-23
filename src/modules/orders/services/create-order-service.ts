import AppError from "@shared/errors/app-error";
import {
  getCustomRepository,
  Transaction,
  TransactionRepository,
} from "typeorm";
import { Customer } from "../../customers/infra/typeorm/entities/Customer";
import { CustomersRepository } from "../../customers/infra/typeorm/repositories/CustomersRepository";
import { Product } from "../../products/infra/typeorm/entities/Product";
import { ProductsRepository } from "../../products/infra/typeorm/repositories/ProductsRepository";
import { Order } from "../infra/typeorm/entities/order";
import { OrdersRepository } from "../infra/typeorm/repositories/orders-repository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

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
      productsStock,
      ordersRepository,
      productsRepository
    );
    return order;
  }

  @Transaction()
  private async saveOrderAndUpdateStock(
    customer: Customer,
    serializedProducts: {
      product_id: string;
      price: number;
      quantity: number;
    }[],
    productsStock: Product[],
    @TransactionRepository(Order) orderRepository: OrdersRepository,
    @TransactionRepository(Product) productRepository: ProductsRepository
  ) {
    const order = await orderRepository.createOrder({
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

    await productRepository.save(updatedProductQuantity);
    return order;
  }

  private async findCustomer(customer_id: string) {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError("Could not find any customer with the given id.");
    }
    return customer;
  }

  private async findProductsAndCheckAvailability(products: IProduct[]) {
    const productsRepository = getCustomRepository(ProductsRepository);
    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError("Could not find any products with the given ids.");
    }

    this.checkInexistentProducts(existsProducts, products);
    this.checkProductsAvailability(existsProducts, products);

    return existsProducts;
  }

  private checkInexistentProducts(
    existsProducts: Product[],
    products: IProduct[]
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
    products: IProduct[]
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
