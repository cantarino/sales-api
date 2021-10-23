import { ICustomer } from "../../../customers/domain/models/ICustomer";
import { IOrderProduct } from "./IOrderProduct";

export interface IOrder {
  id: string;
  customer: ICustomer;
  order_products: IOrderProduct[];
  created_at: Date;
  updated_at: Date;
}
