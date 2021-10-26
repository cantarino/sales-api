import "reflect-metadata";
import { Product } from "../../../src/modules/products/infra/typeorm/entities/Product";
import { DeleteProductService } from "../../../src/modules/products/services/DeleteProductService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeProductCacheProvider } from "../../fakes/providers/FakeProductCacheProvider";
import { FakeProductsRepository } from "../../fakes/repositories/FakeProductsRepository";

let fakeProductsRepository: FakeProductsRepository;
let fakeProductsCache: FakeProductCacheProvider;
let deleteProduct: DeleteProductService;

describe("DeleteProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeProductsCache = new FakeProductCacheProvider();
    deleteProduct = new DeleteProductService(
      fakeProductsRepository,
      fakeProductsCache
    );
  });
  test("should be able to delete a product", async () => {
    const product = await factory.attrs<Product>("Product");
    const { id } = await fakeProductsRepository.create(product);
    await deleteProduct.execute({ id });

    const products = await fakeProductsRepository.findAll();
    expect(products).toHaveLength(0);
  });
  test("should not be able to delete a product with invalid id", async () => {
    const product = await factory.attrs<Product>("Product");
    const { id } = await fakeProductsRepository.create(product);

    expect(
      deleteProduct.execute({ id: `invalid-id-${id}` })
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should reset cache when deleting a product", async () => {
    const product = await factory.attrs<Product>("Product");
    const { id } = await fakeProductsRepository.create(product);
    await deleteProduct.execute({ id });

    const products = await fakeProductsCache.recoverProducts();
    expect(products).toBeNull();
  });
});
