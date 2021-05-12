import { container } from "tsyringe";

import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { UserTypesRepository } from "@modules/users/infra/typeorm/repositories/UserTypesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUserTypesRepository } from "@modules/users/repositories/IUserTypesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserTypesRepository>(
  "UserTypesRepository",
  UserTypesRepository
);
