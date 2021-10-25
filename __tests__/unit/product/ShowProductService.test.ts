import "reflect-metadata";
import { Product } from "../../../src/modules/products/infra/typeorm/entities/Product";
import { ShowProductService } from "../../../src/modules/products/services/ShowProductService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeProductsRepository } from "../../fakes/FakeProductsRepository";

let fakeProductsRepository: FakeProductsRepository;
let showProduct: ShowProductService;

describe("ShowProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    showProduct = new ShowProductService(fakeProductsRepository);
  });
  test("should be able to show a product", async () => {
    const product = await factory.attrs<Product>("Product");
    const dbProduct = await fakeProductsRepository.create(product);
    const queriedProduct = await showProduct.execute({ id: dbProduct.id });

    expect(dbProduct).toEqual(queriedProduct);
  });
  test("should not be able to show product with invalid id", async () => {
    const product = await factory.attrs<Product>("Product");
    const { id } = await fakeProductsRepository.create(product);

    expect(
      showProduct.execute({ id: `invalid-id-${id}` })
    ).rejects.toBeInstanceOf(AppError);
  });
});
