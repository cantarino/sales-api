import "reflect-metadata";
import { Product } from "../../../src/modules/products/infra/typeorm/entities/Product";
import { UpdateProductService } from "../../../src/modules/products/services/UpdateProductService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeProductCacheProvider } from "../../fakes/providers/FakeProductCacheProvider";
import { FakeProductsRepository } from "../../fakes/repositories/FakeProductsRepository";

let fakeProductsRepository: FakeProductsRepository;
let fakeProductsCache: FakeProductCacheProvider;
let updateProduct: UpdateProductService;

describe("UpdateProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeProductsCache = new FakeProductCacheProvider();
    updateProduct = new UpdateProductService(
      fakeProductsRepository,
      fakeProductsCache
    );
  });
  test("should be able to update a product", async () => {
    const product = await factory.attrs<Product>("Product");
    const { id } = await fakeProductsRepository.create(product);
    const newProduct = await factory.attrs<Product>("Product");
    const productToUpdate = { ...newProduct, id };
    const updatedProduct = await updateProduct.execute(productToUpdate);

    expect(updatedProduct).toEqual(productToUpdate);
  });
  test("should not be able to update a two products with the same name", async () => {
    const product = await factory.attrs<Product>("Product");
    const { id } = await fakeProductsRepository.create(product);
    const product2 = await factory.attrs<Product>("Product");
    await fakeProductsRepository.create(product2);
    const newProduct = await factory.attrs<Product>("Product");
    const productToUpdate = { ...newProduct, id, name: product2.name };

    expect(updateProduct.execute(productToUpdate)).rejects.toBeInstanceOf(
      AppError
    );
  });
  test("should be able to update a two products with the same name if its himself", async () => {
    const product = await factory.attrs<Product>("Product");
    const { id } = await fakeProductsRepository.create(product);
    const newProduct = await factory.attrs<Product>("Product");
    const productToUpdate = { ...newProduct, id, name: product.name };
    const updatedProduct = await updateProduct.execute(productToUpdate);

    expect(updatedProduct).toEqual(productToUpdate);
  });
  test("should reset cache when updating a product", async () => {
    const product = await factory.attrs<Product>("Product");
    const { id } = await fakeProductsRepository.create(product);
    await fakeProductsCache.saveProducts([product]);
    const newProduct = await factory.attrs<Product>("Product");
    const productToUpdate = { ...newProduct, id };
    await updateProduct.execute(productToUpdate);
    const products = await fakeProductsCache.recoverProducts();

    expect(products).toBeNull();
  });
});
