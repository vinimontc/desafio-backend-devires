import { ICreateUserTypeDTO } from "../dtos/ICreateUserTypeDTO";
import { UserType } from "../infra/typeorm/entities/UserType";

interface IUserTypesRepository {
  create(data: ICreateUserTypeDTO): Promise<UserType>;
  findById(id: number): Promise<UserType>;
  list(): Promise<UserType[]>;
}

export { IUserTypesRepository };
