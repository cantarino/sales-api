import { IProduct } from "../../../products/domain/models/IProduct";
import { IOrder } from "./IOrder";

export interface IOrderProduct {
  id: string;
  order_id: string;
  order: IOrder;
  product_id: string;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
