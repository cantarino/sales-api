import AppError from "@shared/errors/app-error";
import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import redisCache from "@shared/redis/redis";
import { inject, injectable } from "tsyringe";
import { IUpdateProduct } from "../domain/models/IUpdateProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { Product } from "../infra/typeorm/entities/Product";
@injectable()
export class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    let product = await this.productsRepository.findById(id);
    if (!product) throw new AppError("Product not found.");

    const productExists = await this.productsRepository.findByName(name);
    if (productExists)
      throw new AppError("There is already a product with this name");

    product = { ...product, id, name, price, quantity };

    await redisCache.invalidate(PRODUCT_LIST_KEY);

    await this.productsRepository.save(product);
    return product;
  }
}
