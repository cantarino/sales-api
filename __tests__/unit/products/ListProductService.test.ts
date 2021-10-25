import "reflect-metadata";
import { Product } from "../../../src/modules/products/infra/typeorm/entities/Product";
import { ListProductService } from "../../../src/modules/products/services/ListProductService";
import factory from "../../factory";
import { FakeProductCacheProvider } from "../../fakes/FakeProductCacheProvider";
import { FakeProductsRepository } from "../../fakes/FakeProductsRepository";

let fakeProductsRepository: FakeProductsRepository;
let fakeProductsCache: FakeProductCacheProvider;
let listProduct: ListProductService;

describe("ListProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeProductsCache = new FakeProductCacheProvider();
    listProduct = new ListProductService(
      fakeProductsRepository,
      fakeProductsCache
    );
  });
  test("should be able to list a product", async () => {
    const product = await factory.attrs<Product>("Product");
    await fakeProductsRepository.create(product);
    const products = await listProduct.execute();

    expect(products).toHaveLength(1);
  });
  test("should not be able to list products", async () => {
    const products = await listProduct.execute();

    expect(products).toHaveLength(0);
  });
  test("should be able to list products from cache", async () => {
    const product = await factory.attrs<Product>("Product");
    await fakeProductsCache.saveProducts([product]);

    const productsFromService = await fakeProductsCache.recoverProducts();
    const productsFromCache = await listProduct.execute();

    expect(productsFromService).toEqual(productsFromCache);
  });
});
