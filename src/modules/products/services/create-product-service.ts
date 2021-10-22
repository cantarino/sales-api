import AppError from "@shared/errors/app-error";
import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import RedisCache from "@shared/redis/redis";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/products-repository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);
    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError("There is already a product with this name");
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate(PRODUCT_LIST_KEY);

    await productsRepository.save(product);
    return product;
  }
}
