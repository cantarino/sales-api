import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/products-repository";

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();
    return products;
  }
}
