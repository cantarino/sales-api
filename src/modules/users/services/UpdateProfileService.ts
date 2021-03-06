import AppError from "@shared/errors/app-error";
import { IHashProvider } from "@shared/providers/HashProvider/models/IHashProvider";
import { inject, injectable } from "tsyringe";
import { IUpdateUser } from "../domain/entities/IUpdateUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";

@injectable()
export class UpdateProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}
  public async execute({
    user_id,
    email,
    password,
    old_password,
    name,
  }: IUpdateUser): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError("User not found.");

    const userWithEmail = await this.usersRepository.findByEmail(email);
    if (userWithEmail && userWithEmail.id !== user_id)
      throw new AppError("There is already a user with this mail");

    if (password && !old_password)
      throw new AppError("Old password is required");

    if (password && old_password) {
      const checkPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );
      if (!checkPassword) throw new AppError("Old password does not match");

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;
    await this.usersRepository.save(user);

    return user;
  }
}
