import AppError from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductCacheProvider } from "../providers/ProductCacheProvider/models/IProductCacheProvider";

@injectable()
export class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("ProductCacheProvider")
    private productCacheProvider: IProductCacheProvider
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

    await this.productCacheProvider.invalidateProducts();

    return product;
  }
}
