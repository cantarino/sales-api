import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/products-repository";

export class ListProductService {
  public async execute() {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = productsRepository.find();
    return products;
  }
}
