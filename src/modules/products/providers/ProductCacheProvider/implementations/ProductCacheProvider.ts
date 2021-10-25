import { RedisCacheProvider } from "@shared/providers/CacheProvider/implementations/RedisCacheProvider";
import { IProduct } from "../../../domain/models/IProduct";
import { IProductCacheProvider } from "../models/IProductCacheProvider";
import { PRODUCT_LIST_KEY } from "./ProductRedisKeys";

export class ProductCacheProvider
  extends RedisCacheProvider
  implements IProductCacheProvider
{
  public async saveProducts(products: IProduct[]): Promise<void> {
    await this.save(PRODUCT_LIST_KEY, products);
  }

  public async recoverProducts(): Promise<IProduct[] | null> {
    return await this.recover(PRODUCT_LIST_KEY);
  }

  public async invalidateProducts(): Promise<void> {
    await this.invalidate(PRODUCT_LIST_KEY);
  }
}
