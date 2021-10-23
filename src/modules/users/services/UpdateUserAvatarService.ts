import uploadConfig from "@config/upload";
import AppError from "@shared/errors/app-error";
import fs from "fs";
import path from "path";
import { inject, injectable } from "tsyringe";
import { IUpdateAvatar } from "../domain/entities/IUpdateAvatar";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  public async execute({
    user_id,
    avatar_filename,
  }: IUpdateAvatar): Promise<User> {
    if (!avatar_filename) throw new AppError("Please provide a filename.");

    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError("User not found.");

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatar_filename;
    await this.usersRepository.save(user);

    return user;
  }
}
