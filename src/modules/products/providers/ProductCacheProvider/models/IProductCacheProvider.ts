import { IProduct } from "../../../domain/models/IProduct";

export interface IProductCacheProvider {
  saveProducts(products: IProduct[]): Promise<void>;
  recoverProducts(): Promise<IProduct[] | null>;
  invalidateProducts(): Promise<void>;
}
