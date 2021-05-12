import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, type_id, status } = request.body;
    const { id: request_user_id } = request.user;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      type_id,
      status,
      request_user_id,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
