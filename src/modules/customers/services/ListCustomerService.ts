import { inject, injectable } from "tsyringe";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomerRepository";
@injectable()
export class ListCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute(): Promise<ICustomer[]> {
    const customers = await this.customersRepository.findAll();

    return customers;
  }
}
