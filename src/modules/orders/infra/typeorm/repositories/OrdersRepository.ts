import { getRepository, Repository } from "typeorm";
import { IInsertOrder } from "../../../domain/models/IInsertOrder";
import { IOrdersRepository } from "../../../domain/repositories/IOrdersRepository";
import { Order } from "../entities/Order";

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ["order_products", "customer"],
    });

    return order;
  }

  public async createOrder({
    customer,
    products,
  }: IInsertOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
