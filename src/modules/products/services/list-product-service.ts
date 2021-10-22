import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import RedisCache from "@shared/redis/redis";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/products-repository";
export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(PRODUCT_LIST_KEY);
    if (!products) {
      products = await productsRepository.find();
      await redisCache.save(PRODUCT_LIST_KEY, products);
    }

    return products;
  }
}
