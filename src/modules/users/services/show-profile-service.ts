import AppError from "@shared/errors/app-error";
import { inject } from "tsyringe";
import { IShowUser } from "../domain/entities/IShowUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";

export class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  public async execute({ id }: IShowUser): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new AppError("User not found.");

    return user;
  }
}
