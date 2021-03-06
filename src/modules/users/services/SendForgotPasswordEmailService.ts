import AppError from "@shared/errors/app-error";
import { IMailProvider } from "@shared/providers/MailProvider/models/IMailProvider";
import { inject, injectable } from "tsyringe";
import { ICreateUserToken } from "../domain/entities/ICreateUserToken";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}
  public async execute({ email }: ICreateUserToken): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("There is no user with this email");

    const userToken = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: `New password token`,
      html: `Hello ${user.name}, your token to recover password is ${userToken.token}`,
    });
  }
}
