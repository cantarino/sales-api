import "reflect-metadata";
import { User } from "../../../src/modules/users/infra/typeorm/entities/User";
import { CreateSessionService } from "../../../src/modules/users/services/CreateSessionService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeHashProvider } from "../../fakes/providers/FakeHashProvider";
import { FakeTokenProvider } from "../../fakes/providers/FakeTokenProvider";
import { FakeUsersRepository } from "../../fakes/repositories/FakeUsersRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let createSession: CreateSessionService;

describe("CreateSession", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider
    );
  });
  test("should be able to create a new session", async () => {
    const user = await factory.build<User>("User");
    await fakeUsersRepository.create(user);
    const session = await createSession.execute(user);

    expect(session).toHaveProperty("token");
  });
  test("should not be able to create a session with wrong email", async () => {
    const user = await factory.build<User>("User");
    await fakeUsersRepository.create(user);

    expect(
      createSession.execute({ email: "wrong email", password: user.password })
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should not be able to create a session with wrong password", async () => {
    const user = await factory.build<User>("User");
    await fakeUsersRepository.create(user);

    expect(
      createSession.execute({ email: user.email, password: "wrong password" })
    ).rejects.toBeInstanceOf(AppError);
  });
});
