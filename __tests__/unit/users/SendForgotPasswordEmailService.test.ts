import "reflect-metadata";
import { User } from "../../../src/modules/users/infra/typeorm/entities/User";
import { SendForgotPasswordEmailService } from "../../../src/modules/users/services/SendForgotPasswordEmailService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeMailProvider } from "../../fakes/providers/FakeMailProvider";
import { FakeUsersRepository } from "../../fakes/repositories/FakeUsersRepository";
import { FakeUserTokensRepository } from "../../fakes/repositories/FakeUserTokensRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotEmail: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider
    );
  });
  test("should be able to send a mail", async () => {
    const user = await factory.attrs<User>("User");
    await fakeUsersRepository.create(user);

    await sendForgotEmail.execute(user);
  });
  test("should not be able to send a mail to invalid user mail", async () => {
    const user = await factory.attrs<User>("User");
    await fakeUsersRepository.create(user);

    expect(
      sendForgotEmail.execute({ email: "invalid email" })
    ).rejects.toBeInstanceOf(AppError);
  });
});
