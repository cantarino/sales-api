import { IOrderProduct } from "../../../orders/domain/models/IOrderProduct";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  orders_product: IOrderProduct[];
}
