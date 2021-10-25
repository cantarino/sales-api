import AppError from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { IUpdateProduct } from "../domain/models/IUpdateProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductCacheProvider } from "../providers/ProductCacheProvider/models/IProductCacheProvider";
@injectable()
export class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("ProductCacheProvider")
    private productCacheProvider: IProductCacheProvider
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
    if (productExists && product.name !== name)
      throw new AppError("There is already a product with this name");

    product = { ...product, id, name, price, quantity };
    await this.productsRepository.save(product);
    await this.productCacheProvider.invalidateProducts();

    return product;
  }
}
