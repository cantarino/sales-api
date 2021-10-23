import { Request, Response } from "express";
import { UpdateUserAvatarService } from "../../../services/update-user-avatar-service";

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = new UpdateUserAvatarService();
    const user = await updateAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename,
    });

    return response.json(user);
  }
}