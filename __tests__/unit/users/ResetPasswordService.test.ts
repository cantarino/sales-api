import "reflect-metadata";
import { User } from "../../../src/modules/users/infra/typeorm/entities/User";
import { ResetPasswordService } from "../../../src/modules/users/services/ResetPasswordService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeHashProvider } from "../../fakes/FakeHashProvider";
import { FakeUsersRepository } from "../../fakes/FakeUsersRepository";
import { FakeUserTokensRepository } from "../../fakes/FakeUserTokensRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe("ResetPassword", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });
  test("should be able to create a new session", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const { token } = await fakeUserTokensRepository.generate(id);

    await resetPassword.execute({
      token,
      password: "new password",
    });
    const updatedUser = await fakeUsersRepository.findById(id);
    expect(updatedUser?.password).toBe("new password");
  });
  test("should not be able to create a new session with invalid token", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const { token } = await fakeUserTokensRepository.generate(id);

    expect(
      resetPassword.execute({
        token: `invalid-token-${token}`,
        password: "new password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should not be able to create a new session with expired token", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const { token } = await fakeUserTokensRepository.generateExpired(id);

    expect(
      resetPassword.execute({
        token,
        password: "new password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
