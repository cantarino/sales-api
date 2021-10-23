import AppError from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import { Order } from "../infra/typeorm/entities/Order";

@injectable()
export class ShowOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}
  public async execute({ id }: IShowOrder): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) throw new AppError("Order not found.");

    return order;
  }
}
