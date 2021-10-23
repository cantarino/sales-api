import { getCustomRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/user";
import { UserRepository } from "../infra/typeorm/repositories/users-repository";

export class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();
    return users;
  }
}
