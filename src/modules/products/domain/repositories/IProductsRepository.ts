import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";
import { IShowProduct } from "../models/IShowProduct";

export interface IProductsRepository {
  findAll(): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAllByIds(products: IShowProduct[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
}
