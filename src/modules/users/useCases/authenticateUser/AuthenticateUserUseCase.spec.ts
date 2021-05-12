import { UserStatus } from "@modules/users/enums/UserStatus";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UserTypesRepositoryInMemory } from "@modules/users/repositories/in-memory/UserTypesRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let userTypesRepositoryInMemory: UserTypesRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    userTypesRepositoryInMemory = new UserTypesRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to authenticate a user", async () => {
    const rootType = await userTypesRepositoryInMemory.create({
      title: "root",
      description: "Usuário com permissões completas na aplicação.",
    });

    const rootUser = await usersRepositoryInMemory.create({
      name: "Joseph Rogers",
      email: "desa@waz.sd",
      password: "123456",
      type_id: rootType.id,
      status: UserStatus.ATIVO,
    });

    rootUser.type = rootType;

    const user = await createUserUseCase.execute({
      name: "Clayton Carson",
      email: "cagpapof@zaf.sv",
      password: "123456",
      type_id: 3,
      status: UserStatus.ATIVO,
      request_user_id: rootUser.id,
    });

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: "123456",
    });

    expect(result).toHaveProperty("token");
  });
});
