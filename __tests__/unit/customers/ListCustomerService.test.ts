import "reflect-metadata";
import { Customer } from "../../../src/modules/customers/infra/typeorm/entities/Customer";
import { ListCustomerService } from "../../../src/modules/customers/services/ListCustomerService";
import factory from "../../factory";
import { FakeCustomersRepository } from "../../fakes/repositories/FakeCustomersRepository";

let fakeCustomersRepository: FakeCustomersRepository;
let listCustumer: ListCustomerService;

describe("ListCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listCustumer = new ListCustomerService(fakeCustomersRepository);
  });
  test("should be able to list customers", async () => {
    const customer = await factory.attrs<Customer>("Customer");
    await fakeCustomersRepository.create(customer);

    const customers = await listCustumer.execute();

    expect(customers).toHaveLength(1);
  });
  test("should not be able to list customers", async () => {
    const customers = await listCustumer.execute();

    expect(customers).toHaveLength(0);
  });
});
