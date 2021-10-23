import AppError from "@shared/errors/app-error";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/entities/ICreateUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);
    if (emailExists)
      throw new AppError("There is already a user with this email");

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
