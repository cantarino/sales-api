import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import redisCache from "@shared/redis/redis";
import { getCustomRepository } from "typeorm";
import { Product } from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    let products = await redisCache.recover<Product[]>(PRODUCT_LIST_KEY);
    if (!products) {
      products = await productsRepository.find();
      await redisCache.save(PRODUCT_LIST_KEY, products);
    }

    return products;
  }
}
