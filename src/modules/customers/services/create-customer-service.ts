import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/app-error";
import { Customer } from "../typeorm/entities/customer";
import { CustomersRepository } from "../typeorm/repositories/customers-repository";

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.");
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}
