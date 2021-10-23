import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import redisCache from "@shared/redis/redis";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { Product } from "../infra/typeorm/entities/Product";
@injectable()
export class ListProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductRepository
  ) {}

  public async execute(): Promise<Product[]> {
    let products = await redisCache.recover<Product[]>(PRODUCT_LIST_KEY);
    if (!products) {
      products = await this.productsRepository.findAll();
      await redisCache.save(PRODUCT_LIST_KEY, products);
    }

    return products;
  }
}
