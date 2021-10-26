import "reflect-metadata";
import { Customer } from "../../../src/modules/customers/infra/typeorm/entities/Customer";
import { CreateCustomerService } from "../../../src/modules/customers/services/CreateCustomerService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeCustomersRepository } from "../../fakes/repositories/FakeCustomersRepository";

let fakeCustomersRepository: FakeCustomersRepository;
let createCustumer: CreateCustomerService;

describe("CreateCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustumer = new CreateCustomerService(fakeCustomersRepository);
  });
  test("should be able to create a new customer", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const generatedCustomer = await createCustumer.execute(customer);

    expect(generatedCustomer).toHaveProperty("id");
  });
  test("should not be able to create a two customers with the same email", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    await createCustumer.execute(customer);

    expect(createCustumer.execute(customer)).rejects.toBeInstanceOf(AppError);
  });
});
