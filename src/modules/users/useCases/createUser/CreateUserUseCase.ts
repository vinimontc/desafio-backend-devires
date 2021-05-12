import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { UserStatus } from "@modules/users/enums/UserStatus";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  type: string;
  status: UserStatus;
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
    type,
    status,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      type,
      status,
    });

    return user;
  }
}

export { CreateUserUseCase };
