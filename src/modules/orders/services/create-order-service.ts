import AppError from "@shared/errors/app-error";
import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../../customers/typeorm/repositories/customers-repository";
import { Product } from "../../products/typeorm/entities/product";
import { ProductRepository } from "../../products/typeorm/repositories/products-repository";
import { Order } from "../typeorm/entities/order";
import { OrdersRepository } from "../typeorm/repositories/orders-repository";

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
    const productsRepository = getCustomRepository(ProductRepository);

    const customer = await this.findCustomer(customer_id);
    const dbProducts = await this.findProductsAndCheckAvailability(products);

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: dbProducts.filter((p) => p.id === product.id)[0].price,
    }));
    const order = await ordersRepository.createOrder({
      customer,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updatedProductQuantity = order_products.map((order_product) => ({
      id: order_product.product_id,
      quantity:
        dbProducts.filter((p) => p.id === order_product.product_id)[0]
          .quantity - order_product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);
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
    const productsRepository = getCustomRepository(ProductRepository);
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
