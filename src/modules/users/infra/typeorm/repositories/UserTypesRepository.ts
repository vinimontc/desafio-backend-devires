import { getRepository, Repository } from "typeorm";

import { ICreateUserTypeDTO } from "@modules/users/dtos/ICreateUserTypeDTO";
import { IUserTypesRepository } from "@modules/users/repositories/IUserTypesRepository";

import { UserType } from "../entities/UserType";

class UserTypesRepository implements IUserTypesRepository {
  private repository: Repository<UserType>;

  constructor() {
    this.repository = getRepository(UserType);
  }

  async create({ title, description }: ICreateUserTypeDTO): Promise<UserType> {
    const userType = this.repository.create({
      title,
      description,
    });

    await this.repository.save(userType);

    return userType;
  }
}

export { UserTypesRepository };
