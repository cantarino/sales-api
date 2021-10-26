import "reflect-metadata";
import { Order } from "../../../src/modules/orders/infra/typeorm/entities/Order";
import { ShowOrderService } from "../../../src/modules/orders/services/ShowOrderService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeOrdersRepository } from "../../fakes/repositories/FakeOrdersRepository";

let fakeOrdersRepository: FakeOrdersRepository;
let showOrder: ShowOrderService;

describe("ShowOrder", () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    showOrder = new ShowOrderService(fakeOrdersRepository);
  });
  test("should be able to find a order", async () => {
    const order = await factory.attrs<Order>("Order");
    const dbOrder = await fakeOrdersRepository.create(order);
    const queriedOrder = await showOrder.execute({ id: order.id });

    expect(queriedOrder).toEqual(dbOrder);
  });
  test("should not be able to find a order with invalid id", async () => {
    const order = await factory.attrs<Order>("Order");
    const { id } = await fakeOrdersRepository.create(order);
    expect(
      showOrder.execute({ id: `invalid-id-${id}` })
    ).rejects.toBeInstanceOf(AppError);
  });
});
