import "reflect-metadata";
import { Customer } from "../../../src/modules/customers/infra/typeorm/entities/Customer";
import { UpdateCustomerService } from "../../../src/modules/customers/services/UpdateCustomerService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeCustomersRepository } from "../../fakes/FakeCustomersRepository";

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustumer: UpdateCustomerService;

describe("UpdateCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustumer = new UpdateCustomerService(fakeCustomersRepository);
  });
  test("should be able to update a customer", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const { id } = await fakeCustomersRepository.create(customer);
    const customerToUpdate = await factory.attrs<Customer>("Customer");

    const updatedCustumer = await updateCustumer.execute({
      ...customerToUpdate,
      id,
    });

    expect(updatedCustumer).toEqual({ ...customerToUpdate, id });
  });
  test("should not be able to update a customer with invalid id", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const { id } = await fakeCustomersRepository.create(customer);
    const customerToUpdate = await factory.attrs<Customer>("Customer");

    expect(
      updateCustumer.execute({
        ...customerToUpdate,
        id: `invalid-id-${id}`,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should not be able to update a customer with the same email", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const { id } = await fakeCustomersRepository.create(customer);
    const customer2 = await factory.attrs<Customer>("Customer");
    await fakeCustomersRepository.create(customer2);
    const customerToUpdate = await factory.attrs<Customer>("Customer");

    expect(
      updateCustumer.execute({
        ...customerToUpdate,
        id,
        email: customer2.email,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should be able to update a customer with the same email if its himself", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const { id } = await fakeCustomersRepository.create(customer);
    const customerToUpdate = await factory.attrs<Customer>("Customer");

    const updatedCustumer = await updateCustumer.execute({
      ...customerToUpdate,
      id,
      email: customer.email,
    });

    expect(updatedCustumer).toEqual({
      ...customerToUpdate,
      id,
      email: customer.email,
    });
  });
});
