import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomerRepository";

export class ListCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute(): Promise<ICustomer[]> {
    const customers = await this.customersRepository.findAll();

    return customers;
  }
}
