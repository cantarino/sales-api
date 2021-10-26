import { ICreateUser } from "../../src/modules/users/domain/entities/ICreateUser";
import { IUsersRepository } from "../../src/modules/users/domain/repositories/IUsersRepository";
import { User } from "../../src/modules/users/infra/typeorm/entities/User";
import { generateString } from "../utils/utils";

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email == email);

    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const product = this.users.find((user) => user.name == name);

    return product;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id == id);

    return user;
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = generateString();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users = [...this.users, user];

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex((x) => x.id == user.id);
    this.users[index] = user;

    return user;
  }

  public async remove(user: User): Promise<void> {
    this.users = this.users.filter((x) => x !== user);
  }
}
