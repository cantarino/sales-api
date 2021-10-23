import { EntityRepository, getRepository, Repository } from "typeorm";
import { ICreateCustomer } from "../../../domain/models/ICreateCustomer";
import { ICustomersRepository } from "../../../domain/repositories/ICustomerRepository";
import { Customer } from "../entities/Customer";

@EntityRepository(Customer)
export class CustomersRepository implements ICustomersRepository {
  constructor(private ormRepository: Repository<Customer>) {
    this.ormRepository = getRepository(Customer);
  }

  public async findAll(): Promise<Customer[]> {
    const customers = await this.ormRepository.find();

    return customers;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });
    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}