import { EntityRepository, getRepository, In, Repository } from "typeorm";
import { ICreateProduct } from "../../../domain/models/ICreateProduct";
import { IShowProduct } from "../../../domain/models/IShowProduct";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { Product } from "../entities/product";

@EntityRepository(Product)
export class ProductRepository implements IProductRepository {
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

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}
