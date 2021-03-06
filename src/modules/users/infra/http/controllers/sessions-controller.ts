import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionService } from "../../../services/CreateSessionService";

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = container.resolve(CreateSessionService);
    const { user, token } = await createSession.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}
