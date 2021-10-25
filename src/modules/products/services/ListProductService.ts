import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductCacheProvider } from "../providers/ProductCacheProvider/models/IProductCacheProvider";
@injectable()
export class ListProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("ProductCacheProvider")
    private productCacheProvider: IProductCacheProvider
  ) {}

  public async execute(): Promise<Product[]> {
    let products = await this.productCacheProvider.recoverProducts();

    if (!products) {
      products = await this.productsRepository.findAll();
      await this.productCacheProvider.saveProducts(products);
    }

    return products;
  }
}
