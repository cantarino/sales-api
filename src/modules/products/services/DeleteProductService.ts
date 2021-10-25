import AppError from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { IDeleteProduct } from "../domain/models/IDeleteProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { IProductCacheProvider } from "../providers/ProductCacheProvider/models/IProductCacheProvider";
@injectable()
export class DeleteProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("ProductCacheProvider")
    private productCacheProvider: IProductCacheProvider
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new AppError("Product not found.");

    await this.productsRepository.remove(product);
    await this.productCacheProvider.invalidateProducts();
  }
}
