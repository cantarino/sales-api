import AppError from "@shared/errors/app-error";
import { getCustomRepository } from "typeorm";
import { Order } from "../infra/typeorm/entities/Order";
import { OrdersRepository } from "../infra/typeorm/repositories/orders-repository";

interface IRequest {
  id: string;
}

export class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError("Order not found.");
    }

    return order;
  }
}
