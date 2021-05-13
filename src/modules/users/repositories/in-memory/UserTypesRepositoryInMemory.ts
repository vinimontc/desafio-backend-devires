import { ICreateUserTypeDTO } from "@modules/users/dtos/ICreateUserTypeDTO";
import { UserType } from "@modules/users/infra/typeorm/entities/UserType";

import { IUserTypesRepository } from "../IUserTypesRepository";

class UserTypesRepositoryInMemory implements IUserTypesRepository {
  userTypes: UserType[] = [];

  async create({ title, description }: ICreateUserTypeDTO): Promise<UserType> {
    const userType = new UserType();

    Object.assign(userType, {
      title,
      description,
    });

    this.userTypes.push(userType);

    return userType;
  }

  async findById(id: number): Promise<UserType> {
    return this.userTypes.find((userType) => userType.id === id);
  }

  async list(): Promise<UserType[]> {
    const allUserTypes = this.userTypes;

    return allUserTypes;
  }
}

export { UserTypesRepositoryInMemory };
