import { ICustomer } from "../../../customers/domain/models/ICustomer";

interface IOrderProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface IInsertOrder {
  customer: ICustomer;
  products: IOrderProduct[];
  productsStock: IProduct[];
}
