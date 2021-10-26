import { ICreateCustomer } from "../../../src/modules/customers/domain/models/ICreateCustomer";
import { ICustomersRepository } from "../../../src/modules/customers/domain/repositories/ICustomerRepository";
import { Customer } from "../../../src/modules/customers/infra/typeorm/entities/Customer";
import { generateString } from "../../utils/utils";

export class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find((customer) => customer.name == name);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find((customer) => customer.id == id);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find((customer) => customer.email == email);

    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = generateString();
    customer.name = name;
    customer.email = email;

    this.customers = [...this.customers, customer];

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const index = this.customers.findIndex((x) => x.id == customer.id);
    this.customers[index] = customer;

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    this.customers = this.customers.filter((x) => x !== customer);
  }
}
