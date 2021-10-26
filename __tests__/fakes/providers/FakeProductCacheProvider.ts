import { IProduct } from "../../../src/modules/products/domain/models/IProduct";
import { Product } from "../../../src/modules/products/infra/typeorm/entities/Product";
import { IProductCacheProvider } from "../../../src/modules/products/providers/ProductCacheProvider/models/IProductCacheProvider";

export class FakeProductCacheProvider implements IProductCacheProvider {
  private products: Product[] = [];

  public async saveProducts(products: IProduct[]): Promise<void> {
    this.products = products;
  }

  public async recoverProducts(): Promise<IProduct[] | null> {
    return this.products.length ? this.products : null;
  }

  public async invalidateProducts(): Promise<void> {
    this.products = [];
  }
}
