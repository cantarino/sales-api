import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";

export interface IProductRepository {
  findAll(): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
}
