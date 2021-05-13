import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateStatusUseCase } from "./UpdateStatusUseCase";

class UpdateStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: request_user_id } = request.user;
    const { user_id } = request.params;

    const updateStatusUseCase = container.resolve(UpdateStatusUseCase);

    await updateStatusUseCase.execute({ request_user_id, user_id });

    return response.send();
  }
}

export { UpdateStatusController };
