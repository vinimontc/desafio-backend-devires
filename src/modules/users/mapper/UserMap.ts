import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({ id, name, email, status, type }: User): IUserResponseDTO {
    const user = {
      id,
      name,
      email,
      type: type.title,
      status,
    };

    return user;
  }
}

export { UserMap };
