import { ICreateOrder } from "../models/ICreateOrder";
import { IOrder } from "../models/IOrder";

export interface IOrdersRepository {
  findAll(): Promise<IOrder[]>;
  findById(id: string): Promise<IOrder | undefined>;
  create(data: ICreateOrder): Promise<IOrder>;
  save(order: IOrder): Promise<IOrder>;
  remove(order: IOrder): Promise<void>;
}
