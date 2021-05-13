import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: request_user_id } = request.user;
    const { user_id } = request.params;

    const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);

    const user = await showUserProfileUseCase.execute({
      request_user_id,
      user_id,
    });

    return response.json(user);
  }
}

export { ShowUserProfileController };
