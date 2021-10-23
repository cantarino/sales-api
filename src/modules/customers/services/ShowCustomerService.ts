import AppError from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { ICustomer } from "../domain/models/ICustomer";
import { IDeleteCustomer } from "../domain/models/IDeleteCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomerRepository";

@injectable()
export class ShowCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) throw new AppError("Customer not found.");

    return customer;
  }
}
