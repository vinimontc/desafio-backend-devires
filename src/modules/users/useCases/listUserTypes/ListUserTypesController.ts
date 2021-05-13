import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserTypesUseCase } from "./ListUserTypesUseCase";

class ListUserTypesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: request_user_id } = request.user;

    const listUserTypesUseCase = container.resolve(ListUserTypesUseCase);

    const allUserTypes = await listUserTypesUseCase.execute(request_user_id);

    return response.json(allUserTypes);
  }
}

export { ListUserTypesController };
