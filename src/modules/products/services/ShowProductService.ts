import AppError from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { IShowProduct } from "../domain/models/IShowProduct";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { Product } from "../infra/typeorm/entities/Product";
@injectable()
export class ShowProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductRepository
  ) {}

  public async execute({ id }: IShowProduct): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new AppError("Product not found.");

    return product;
  }
}
