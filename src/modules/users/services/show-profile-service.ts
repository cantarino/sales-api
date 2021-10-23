import AppError from "@shared/errors/app-error";
import { getCustomRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/User";
import { UserRepository } from "../infra/typeorm/repositories/users-repository";

interface IRequest {
  user_id: string;
}

export class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);
    if (!user) throw new AppError("User not found.");

    return user;
  }
}
