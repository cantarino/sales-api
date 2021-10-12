import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entitites/product";
import { ProductRepository } from "../typeorm/repositories/products-repository";

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = productsRepository.find();
    return products;
  }
}
