import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { UserStatus } from "@modules/users/enums/UserStatus";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
  type_id: number;
  status: UserStatus;
  request_user_id: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    type_id,
    status,
    request_user_id,
  }: IRequest): Promise<User> {
    const requestUser = await this.usersRepository.findById(request_user_id);

    if (
      requestUser.type.title !== "root" &&
      requestUser.type.title !== "admin"
    ) {
      throw new AppError("User is not authorized", 401);
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      type_id,
      status,
    });

    return user;
  }
}

export { CreateUserUseCase };
