import { Request, Response } from "express";
import { CreateUserService } from "../services/create-user-service";
import { ListUserService } from "../services/list-user-service";

export class UsersController {
  public async index(_: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();

    return res.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
