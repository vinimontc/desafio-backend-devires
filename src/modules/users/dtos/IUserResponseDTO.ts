import { UserStatus } from "../enums/UserStatus";

interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  type: string;
}

export { IUserResponseDTO };
