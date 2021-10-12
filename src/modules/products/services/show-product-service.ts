import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/app-error";
import { Product } from "../typeorm/entitites/product";
import { ProductRepository } from "../typeorm/repositories/products-repository";
interface IRequest {
  id: string;
}
export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = productsRepository.findOne(id);
    if (!product) throw new AppError("Product not found.");

    return product;
  }
}
