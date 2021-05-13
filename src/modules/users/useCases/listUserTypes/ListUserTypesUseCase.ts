import { inject, injectable } from "tsyringe";

import { UserType } from "@modules/users/infra/typeorm/entities/UserType";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTypesRepository } from "@modules/users/repositories/IUserTypesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListUserTypesUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTypesRepository")
    private userTypesRepository: IUserTypesRepository
  ) {}

  async execute(request_user_id: string): Promise<UserType[]> {
    const requestUser = await this.usersRepository.findById(request_user_id);
    const requestUserType = await this.userTypesRepository.findById(
      requestUser.type_id
    );

    if (requestUserType.title !== "root" && requestUserType.title !== "admin") {
      throw new AppError("User is not authorized", 401);
    }

    const allUserTypes = await this.userTypesRepository.list();

    return allUserTypes;
  }
}

export { ListUserTypesUseCase };
