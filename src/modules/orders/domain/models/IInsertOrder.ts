import { ICustomer } from "../../../customers/domain/models/ICustomer";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export interface IInsertOrder {
  customer: ICustomer;
  products: IProduct[];
}
