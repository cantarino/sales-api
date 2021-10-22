import AppError from "@shared/errors/app-error";
import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import RedisCache from "@shared/redis/redis";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/products-repository";
interface IRequest {
  id: string;
}
export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError("Product not found.");

    await redisCache.invalidate(PRODUCT_LIST_KEY);

    await productsRepository.remove(product);
  }
}
