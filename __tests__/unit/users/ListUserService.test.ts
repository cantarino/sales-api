import "reflect-metadata";
import { User } from "../../../src/modules/users/infra/typeorm/entities/User";
import { ListUserService } from "../../../src/modules/users/services/ListUserService";
import factory from "../../factory";
import { FakeUsersRepository } from "../../fakes/FakeUsersRepository";

let fakeUsersRepository: FakeUsersRepository;
let listUser: ListUserService;

describe("ListUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUser = new ListUserService(fakeUsersRepository);
  });
  test("should be able to list a user", async () => {
    const user = await factory.build<User>("User");
    await fakeUsersRepository.create(user);
    const users = await listUser.execute();

    expect(users).toHaveLength(1);
  });
  test("should not be able to list users", async () => {
    const users = await listUser.execute();

    expect(users).toHaveLength(0);
  });
});
