import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  request_user_id: string;
  user_id: string;
}

@injectable()
class UpdateStatusUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ request_user_id, user_id }: IRequest): Promise<void> {
    const requestUser = await this.usersRepository.findById(request_user_id);

    if (
      requestUser.type.title !== "root" &&
      requestUser.type.title !== "admin"
    ) {
      throw new AppError("User is not authorized", 401);
    }

    let status;

    const userToBeUpdate = await this.usersRepository.findById(user_id);

    if (!userToBeUpdate) {
      throw new AppError("User does not exists", 404);
    }

    if (userToBeUpdate.status === "ativo") {
      status = "inativo";
    } else {
      status = "ativo";
    }

    await this.usersRepository.updateStatus(user_id, status);
  }
}

export { UpdateStatusUseCase };
