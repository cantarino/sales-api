import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/app-error";
import { ProductRepository } from "../typeorm/repositories/products-repository";
interface IRequest {
  id: string;
}
export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError("Product not found.");

    await productsRepository.remove(product);
  }
}
