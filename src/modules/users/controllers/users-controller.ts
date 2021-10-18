import { Request, Response } from "express";
import { CreateUserService } from "../services/create-user-service";
import { ListUserService } from "../services/list-user-service";

export class UsersController {
  public async index(_: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();

    return res.json(users);
  }

  public async show(_: Request, res: Response): Promise<Response> {
    return res.json({});
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

  public async update(_: Request, response: Response): Promise<Response> {
    return response.json({});
  }

  public async delete(_: Request, response: Response): Promise<Response> {
    return response.json({});
  }
}
