import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/app-error";
import { Customer } from "../typeorm/entities/customer";
import { CustomersRepository } from "../typeorm/repositories/customers-repository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("There is already one customer with this email.");
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}