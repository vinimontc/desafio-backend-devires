import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: request_user_id } = request.user;
    const { user_id } = request.params;
    const { name, email, password, type_id } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      name,
      email,
      password,
      type_id,
      request_user_id,
      user_id,
    });

    return response.json();
  }
}

export { UpdateUserController };
