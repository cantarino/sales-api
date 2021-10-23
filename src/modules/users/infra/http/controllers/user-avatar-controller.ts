import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarService } from "../../../services/UpdateUserAvatarService";

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateAvatarService.execute({
      user_id: request.user.id,
      avatar_filename: request.file?.filename,
    });

    return response.json(user);
  }
}
