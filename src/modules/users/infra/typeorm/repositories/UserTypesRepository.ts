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

  async findById(id: number): Promise<UserType> {
    const userType = await this.repository.findOne(id);

    return userType;
  }

  async list(): Promise<UserType[]> {
    const userTypes = await this.repository.find();

    return userTypes;
  }
}

export { UserTypesRepository };
