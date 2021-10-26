import "reflect-metadata";
import { User } from "../../../src/modules/users/infra/typeorm/entities/User";
import { ShowProfileService } from "../../../src/modules/users/services/ShowProfileService";
import AppError from "../../../src/shared/errors/app-error";
import factory from "../../factory";
import { FakeUsersRepository } from "../../fakes/repositories/FakeUsersRepository";

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowProfileService;

describe("ShowUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUser = new ShowProfileService(fakeUsersRepository);
  });
  test("should be able to show a user", async () => {
    const user = await factory.build<User>("User");
    const dbUser = await fakeUsersRepository.create(user);

    const queriedUser = await showUser.execute({ id: dbUser.id });

    expect(queriedUser).toEqual(dbUser);
  });
  test("should not be able to show a user with invalid id", async () => {
    const user = await factory.build<User>("User");
    const { id } = await fakeUsersRepository.create(user);

    expect(showUser.execute({ id: `invalid-id-${id}` })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
