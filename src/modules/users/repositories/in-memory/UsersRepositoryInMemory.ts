import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UserStatus } from "@modules/users/enums/UserStatus";
import { User } from "@modules/users/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    type_id,
    status,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      type_id,
      status,
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async delete(id: string): Promise<void> {
    const user = this.users.find((user) => user.id === id);

    this.users.splice(this.users.indexOf(user));
  }

  async updateStatus(id: string, status: UserStatus): Promise<void> {
    const findIndex = this.users.findIndex((user) => user.id === id);

    this.users[findIndex].status = status;
  }
}

export { UsersRepositoryInMemory };
