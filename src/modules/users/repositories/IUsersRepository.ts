import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { ISaveUserDTO } from "../dtos/ISaveUserDTO";
import { UserStatus } from "../enums/UserStatus";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(data: ISaveUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, status: UserStatus): Promise<void>;
}

export { IUsersRepository };
