import AppError from "@shared/errors/app-error";
import { PRODUCT_LIST_KEY } from "@shared/redis/keys";
import redisCache from "@shared/redis/redis";
import { inject, injectable } from "tsyringe";
import { IDeleteProduct } from "../domain/models/IDeleteProduct";
import { IProductRepository } from "../domain/repositories/IProductRepository";
@injectable()
export class DeleteProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductRepository
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new AppError("Product not found.");

    await redisCache.invalidate(PRODUCT_LIST_KEY);

    await this.productsRepository.remove(product);
  }
}
