import { UserStatus } from "../enums/UserStatus";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  type: string;
  status: UserStatus;
}

export { ICreateUserDTO };
