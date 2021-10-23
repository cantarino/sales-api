import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";
import { IShowProduct } from "../models/IShowProduct";
import { IUpdateProductQuantity } from "../models/IUpdateProductQuantity";

export interface IProductsRepository {
  findAll(): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAllByIds(products: IShowProduct[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateProductQuantity[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
