import AppError from "@shared/errors/app-error";
import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import redisCache from "@shared/redis/redis";
import { inject, injectable } from "tsyringe";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { Product } from "../infra/typeorm/entities/Product";

@injectable()
export class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists)
      throw new AppError("There is already a product with this name");

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate(PRODUCT_LIST_KEY);

    return product;
  }
}
