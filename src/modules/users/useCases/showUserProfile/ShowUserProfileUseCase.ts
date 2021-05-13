import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { UserMap } from "@modules/users/mapper/UserMap";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  request_user_id: string;
  user_id: string;
}

@injectable()
class ShowUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    request_user_id,
    user_id,
  }: IRequest): Promise<IUserResponseDTO> {
    const requestUser = await this.usersRepository.findById(request_user_id);

    if (
      requestUser.type.title !== "root" &&
      requestUser.type.title !== "admin" &&
      requestUser.id !== user_id
    ) {
      throw new AppError("User is not authorized", 401);
    }

    const user = await this.usersRepository.findById(user_id);

    return UserMap.toDTO(user);
  }
}

export { ShowUserProfileUseCase };
