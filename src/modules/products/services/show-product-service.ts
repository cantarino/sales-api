import AppError from "@shared/errors/app-error";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/products-repository";
interface IRequest {
  id: string;
}
export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError("Product not found.");

    return product;
  }
}
