import "reflect-metadata";
import { Product } from "../../../src/modules/products/infra/typeorm/entities/Product";
import { CreateProductService } from "../../../src/modules/products/services/CreateProductService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeProductCacheProvider } from "../../fakes/providers/FakeProductCacheProvider";
import { FakeProductsRepository } from "../../fakes/repositories/FakeProductsRepository";

let fakeProductsRepository: FakeProductsRepository;
let fakeProductsCache: FakeProductCacheProvider;
let createProduct: CreateProductService;

describe("CreateProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeProductsCache = new FakeProductCacheProvider();
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeProductsCache
    );
  });
  test("should be able to create a new product", async () => {
    const product = await factory.attrs<Product>("Product");
    const generatedProduct = await createProduct.execute(product);

    expect(generatedProduct).toHaveProperty("id");
  });
  test("should not be able to create a two products with the same name", async () => {
    const product = await factory.attrs<Product>("Product");
    await createProduct.execute(product);

    expect(createProduct.execute(product)).rejects.toBeInstanceOf(AppError);
  });
  test("should reset cache when creating a new product", async () => {
    const product = await factory.attrs<Product>("Product");
    await createProduct.execute(product);
    const products = await fakeProductsCache.recoverProducts();

    expect(products).toBeNull();
  });
});
