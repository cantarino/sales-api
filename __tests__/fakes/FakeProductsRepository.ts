import { ICreateProduct } from "../../src/modules/products/domain/models/ICreateProduct";
import { IShowProduct } from "../../src/modules/products/domain/models/IShowProduct";
import { IProductsRepository } from "../../src/modules/products/domain/repositories/IProductsRepository";
import { Product } from "../../src/modules/products/infra/typeorm/entities/Product";
import { generateString } from "../utils/utils";

export class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async findAllByIds(products: IShowProduct[]): Promise<Product[]> {
    const productsIds = products.map((x) => x.id);
    const filteredProducts = this.products.filter((x) =>
      productsIds.includes(x.id)
    );

    return filteredProducts;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find((product) => product.name == name);

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find((product) => product.id == id);

    return product;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.id = generateString();
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    this.products = [...this.products, product];

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const index = this.products.findIndex((x) => x.id == product.id);
    this.products[index] = product;

    return product;
  }

  public async remove(product: Product): Promise<void> {
    this.products = this.products.filter((x) => x !== product);
  }
}
