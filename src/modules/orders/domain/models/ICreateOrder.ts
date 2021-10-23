import { IUpdateProductQuantity } from "../../../products/domain/models/IUpdateProductQuantity";
export interface ICreateOrder {
  customer_id: string;
  products: IUpdateProductQuantity[];
}
