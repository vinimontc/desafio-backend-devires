import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  request_user_id: string;
  user_id: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ request_user_id, user_id }: IRequest): Promise<void> {
    const requestUser = await this.usersRepository.findById(request_user_id);

    if (requestUser.type.title !== "root") {
      throw new AppError("User is not authorized", 401);
    }

    const userToBeDelete = await this.usersRepository.findById(user_id);

    if (!userToBeDelete) {
      throw new AppError("User does not exists", 404);
    }

    await this.usersRepository.delete(user_id);
  }
}

export { DeleteUserUseCase };
