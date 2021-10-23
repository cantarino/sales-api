import AppError from "@shared/errors/app-error";
import { IDeleteCustomer } from "../domain/models/IDeleteCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomerRepository";

export class DeleteCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) throw new AppError("Customer not found.");

    await this.customersRepository.remove(customer);
  }
}
