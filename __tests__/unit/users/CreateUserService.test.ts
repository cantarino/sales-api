import "reflect-metadata";
import { User } from "../../../src/modules/users/infra/typeorm/entities/User";
import { CreateUserService } from "../../../src/modules/users/services/CreateUserService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeHashProvider } from "../../fakes/providers/FakeHashProvider";
import { FakeUsersRepository } from "../../fakes/repositories/FakeUsersRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  test("should be able to create a new user", async () => {
    const user = await factory.build<User>("User");
    const generatedUser = await createUser.execute(user);

    expect(generatedUser).toHaveProperty("id");
  });
  test("should not be able to create a two users with the same email", async () => {
    const user = await factory.build<User>("User");
    await createUser.execute(user);

    expect(createUser.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
