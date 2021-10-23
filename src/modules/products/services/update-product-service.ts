import AppError from "@shared/errors/app-error";
import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import redisCache from "@shared/redis/redis";
import { getCustomRepository } from "typeorm";
import { Product } from "../infra/typeorm/entities/product";
import { ProductRepository } from "../infra/typeorm/repositories/products-repository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    let product = await productsRepository.findOne(id);
    if (!product) throw new AppError("Product not found.");

    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError("There is already a product with this name");
    }

    product = { ...product, id, name, price, quantity };

    await redisCache.invalidate(PRODUCT_LIST_KEY);

    await productsRepository.save(product);
    return product;
  }
}
