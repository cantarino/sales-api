import AppError from "@shared/errors/app-error";
import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import redisCache from "@shared/redis/redis";
import { getCustomRepository } from "typeorm";
import { Product } from "../infra/typeorm/entities/product";
import { ProductRepository } from "../infra/typeorm/repositories/products-repository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

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
