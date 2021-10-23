import AppError from "@shared/errors/app-error";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/User";
import { UserRepository } from "../infra/typeorm/repositories/users-repository";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export class UpdateProfileService {
  public async execute({
    user_id,
    email,
    password,
    old_password,
    name,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);
    if (!user) throw new AppError("User not found.");

    const userWithEmail = await userRepository.findByEmail(email);
    if (userWithEmail && userWithEmail.id !== user_id)
      throw new AppError("There is already a user with this mail");

    if (password && !old_password)
      throw new AppError("Old password is required");

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password);

      if (!checkPassword) {
        throw new AppError("Old password does not match");
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;
    await userRepository.save(user);

    return user;
  }
}
