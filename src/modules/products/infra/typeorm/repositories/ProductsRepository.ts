import { getRepository, In, Repository } from "typeorm";
import { ICreateProduct } from "../../../domain/models/ICreateProduct";
import { IShowProduct } from "../../../domain/models/IShowProduct";
import { IUpdateProductQuantity } from "../../../domain/models/IUpdateProductQuantity";
import { IProductsRepository } from "../../../domain/repositories/IProductsRepository";
import { Product } from "../entities/Product";

export class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IShowProduct[]): Promise<Product[]> {
    const productIds = products.map((product) => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async updateStock(products: IUpdateProductQuantity[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}
