import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<void> {
    const userToBeDelete = await this.usersRepository.findById(user_id);

    if (!userToBeDelete) {
      throw new AppError("User does not exists", 404);
    }

    await this.usersRepository.delete(user_id);
  }
}

export { DeleteUserUseCase };
