import uploadConfig from "@config/upload";
import AppError from "@shared/errors/app-error";
import fs from "fs";
import path from "path";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/users-repository";
interface IRequest {
  userId: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}
