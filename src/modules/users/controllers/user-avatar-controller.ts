import { Request, Response } from "express";
import { UpdateUserAvatarService } from "../services/update-user-avatar-service";

export class UserAvatarController {
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json({});
  }

  public async show(_: Request, res: Response): Promise<Response> {
    return res.json({});
  }

  public async create(_: Request, response: Response): Promise<Response> {
    return response.json({});
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id, avatar_filename } = request.body;

    const updateAvatarService = new UpdateUserAvatarService();
    const user = updateAvatarService.execute({
      user_id,
      avatar_filename,
    });

    return response.json(user);
  }

  public async delete(_: Request, response: Response): Promise<Response> {
    return response.json({});
  }
}
