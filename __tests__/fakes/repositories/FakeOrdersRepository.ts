import { IInsertOrder } from "../../../src/modules/orders/domain/models/IInsertOrder";
import { IOrdersRepository } from "../../../src/modules/orders/domain/repositories/IOrdersRepository";
import { Order } from "../../../src/modules/orders/infra/typeorm/entities/Order";
import { generateString } from "../../utils/utils";

export class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  async findById(id: string): Promise<Order | undefined> {
    const order = this.orders.find((order) => order.id == id);

    return order;
  }

  public async create(order: Order): Promise<Order> {
    order.id = generateString();
    this.orders = [...this.orders, order];

    return order;
  }

  async createOrderAndUpdateStock({
    customer,
    products,
    productsStock,
  }: IInsertOrder): Promise<Order> {
    const order = new Order();

    order.customer = customer;
    //order.order_products = products

    //update stock
    return order;
  }
}
