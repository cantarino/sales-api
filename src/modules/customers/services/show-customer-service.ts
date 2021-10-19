import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/app-error";
import { Customer } from "../typeorm/entities/customer";
import { CustomersRepository } from "../typeorm/repositories/customers-repository";

interface IRequest {
  id: string;
}

export class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    return customer;
  }
}