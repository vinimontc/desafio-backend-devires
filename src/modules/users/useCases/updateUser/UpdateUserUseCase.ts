import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTypesRepository } from "@modules/users/repositories/IUserTypesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name?: string;
  email?: string;
  password?: string;
  type_id?: number;
  request_user_id: string;
  user_id: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTypesRepository")
    private userTypesRepository: IUserTypesRepository
  ) {}

  async execute({
    name,
    email,
    password,
    type_id,
    request_user_id,
    user_id,
  }: IRequest): Promise<void> {
    const requestUser = await this.usersRepository.findById(request_user_id);

    if (
      requestUser.type.title !== "root" &&
      requestUser.type.title !== "admin" &&
      requestUser.id !== user_id
    ) {
      throw new AppError("User is not authorized", 401);
    }

    const userToBeUpdate = await this.usersRepository.findById(user_id);

    if (!userToBeUpdate) {
      throw new AppError("User does not exists", 404);
    }

    if (
      (requestUser.type.title === "root" ||
        requestUser.type.title === "admin") &&
      type_id
    ) {
      const type = await this.userTypesRepository.findById(type_id);

      if (!type) {
        throw new AppError("Type not found", 404);
      }

      userToBeUpdate.type_id = type_id;
    } else if (type_id) {
      throw new AppError("This user do not have permission to change the type");
    }

    if (email) {
      const userExists = await this.usersRepository.findByEmail(email);

      if (userExists) throw new AppError("Email already in use");

      userToBeUpdate.email = email;
    }

    if (name) userToBeUpdate.name = name;

    if (password) {
      const passwordHash = await hash(password, 8);

      userToBeUpdate.password = passwordHash;
    }

    await this.usersRepository.save(userToBeUpdate);
  }
}

export { UpdateUserUseCase };
