import "reflect-metadata";
import { Customer } from "../../../src/modules/customers/infra/typeorm/entities/Customer";
import { ShowCustomerService } from "../../../src/modules/customers/services/ShowCustomerService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeCustomersRepository } from "../../fakes/FakeCustomersRepository";

let fakeCustomersRepository: FakeCustomersRepository;
let showCustumer: ShowCustomerService;

describe("ShowCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustumer = new ShowCustomerService(fakeCustomersRepository);
  });
  test("should be able to find a customer", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const { id } = await fakeCustomersRepository.create(customer);
    const queriedCustomer = await showCustumer.execute({ id });

    expect(queriedCustomer.id).toBe(id);
    expect(queriedCustomer.name).toBe(customer.name);
    expect(queriedCustomer.email).toBe(customer.email);
  });
  test("should not be able to find a customer with invalid id", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    const { id } = await fakeCustomersRepository.create(customer);

    expect(
      showCustumer.execute({ id: `invalid-id-${id}` })
    ).rejects.toBeInstanceOf(AppError);
  });
});
