import AppError from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../../customers/domain/repositories/ICustomerRepository";
import { IUpdateProductQuantity } from "../../products/domain/models/IUpdateProductQuantity";
import { IProductsRepository } from "../../products/domain/repositories/IProductsRepository";
import { Product } from "../../products/infra/typeorm/entities/Product";
import { IProductCacheProvider } from "../../products/providers/ProductCacheProvider/models/IProductCacheProvider";
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
    private customersRepository: ICustomersRepository,
    @inject("ProductCacheProvider")
    private productCacheProvider: IProductCacheProvider
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

    const order = await this.ordersRepository.createOrderAndUpdateStock({
      customer,
      products: serializedProducts,
      productsStock,
    });
    await this.productCacheProvider.invalidateProducts();

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
