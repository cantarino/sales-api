import "reflect-metadata";
import { User } from "../../../src/modules/users/infra/typeorm/entities/User";
import { UpdateProfileService } from "../../../src/modules/users/services/UpdateProfileService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeHashProvider } from "../../fakes/providers/FakeHashProvider";
import { FakeUsersRepository } from "../../fakes/repositories/FakeUsersRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateProfileService;

describe("UpdateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUser = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  test("should be able to update a user", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const userToUpdate = await factory.attrs<User>("User");

    const updatedUser = await updateUser.execute({
      ...userToUpdate,
      user_id: id,
      old_password: user.password,
    });

    expect({ ...userToUpdate, id }).toEqual(updatedUser);
  });
  test("should not be able to update a user with invalid id", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const userToUpdate = await factory.attrs<User>("User");

    expect(
      updateUser.execute({ ...userToUpdate, user_id: `invalid-id-${id}` })
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should not be able to update a user with the same email", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const user2 = await factory.attrs<User>("User");
    const { email } = await fakeUsersRepository.create(user2);
    const userToUpdate = await factory.attrs<User>("User");

    expect(
      updateUser.execute({
        ...userToUpdate,
        user_id: id,
        email,
        old_password: user.password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should be able to update a user with the same email if its himself", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const userToUpdate = await factory.attrs<User>("User");

    const updatedUser = await updateUser.execute({
      ...userToUpdate,
      user_id: id,
      email: user.email,
      old_password: user.password,
    });
    expect(updatedUser).toEqual({ ...userToUpdate, email: user.email, id });
  });
  test("should not be able to update a user without old password", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const userToUpdate = await factory.attrs<User>("User");

    expect(
      updateUser.execute({ ...userToUpdate, user_id: id, old_password: "" })
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should not be able to update a user with wrong old password", async () => {
    const user = await factory.attrs<User>("User");
    const { id } = await fakeUsersRepository.create(user);
    const userToUpdate = await factory.attrs<User>("User");

    expect(
      updateUser.execute({
        ...userToUpdate,
        user_id: id,
        old_password: "wrong password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
