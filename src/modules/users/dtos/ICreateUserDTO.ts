import { UserStatus } from "../enums/UserStatus";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  type_id: number;
  status: UserStatus;
}

export { ICreateUserDTO };
