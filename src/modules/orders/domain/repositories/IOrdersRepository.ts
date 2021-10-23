import { IInsertOrder } from "../models/IInsertOrder";
import { IOrder } from "../models/IOrder";

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  createOrder(data: IInsertOrder): Promise<IOrder>;
}
