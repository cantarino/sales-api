import AppError from "@shared/errors/app-error";
import { sendMail } from "@shared/nodemailer/mail";
import { getCustomRepository } from "typeorm";
import { UserTokensRepository } from "../infra/typeorm/repositories/user-tokens-repository";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";
interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("There is no user with this email");
    }

    const userToken = await usersTokenRepository.generate(user.id);

    await sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: `New password token`,
      html: `Hello ${user.name}, your token to recover password is ${userToken.token}`,
    });
  }
}
