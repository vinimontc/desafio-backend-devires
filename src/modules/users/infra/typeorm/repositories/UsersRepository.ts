import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    type,
    status,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      type,
      status,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
