import "reflect-metadata";
import { Customer } from "../../../src/modules/customers/infra/typeorm/entities/Customer";
import { DeleteCustomerService } from "../../../src/modules/customers/services/DeleteCustomerService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeCustomersRepository } from "../../fakes/repositories/FakeCustomersRepository";

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustumer: DeleteCustomerService;

describe("DeleteCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    deleteCustumer = new DeleteCustomerService(fakeCustomersRepository);
  });
  test("should be able to delete a customer", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const { id } = await fakeCustomersRepository.create(customer);
    await deleteCustumer.execute({ id });

    const customers = await fakeCustomersRepository.findAll();

    expect(customers).toHaveLength(0);
  });
  test("should not be able to create delete customers with invalid id", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const { id } = await fakeCustomersRepository.create(customer);

    expect(
      deleteCustumer.execute({ id: `invalid-id-${id}` })
    ).rejects.toBeInstanceOf(AppError);
  });
});
