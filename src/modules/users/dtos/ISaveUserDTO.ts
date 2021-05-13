import { UserStatus } from "../enums/UserStatus";

interface ISaveUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  type_id: number;
  status: UserStatus;
}

export { ISaveUserDTO };
