import { UserStatus } from "@modules/users/enums/UserStatus";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UserTypesRepositoryInMemory } from "@modules/users/repositories/in-memory/UserTypesRepositoryInMemory";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypesRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user with root requester", async () => {
    const rootType = await userTypesRepositoryInMemory.create({
      title: "root",
      description: "Usuário com permissões completas na aplicação.",
    });

    const geralType = await userTypesRepositoryInMemory.create({
      title: "geral",
      description: "Usuário com permissões limitadas as suas informações.",
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
      type_id: geralType.id,
      status: UserStatus.ATIVO,
      request_user_id: rootUser.id,
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toEqual("Clayton Carson");
  });

  it("should be able to create a new user with admin requester", async () => {
    const adminType = await userTypesRepositoryInMemory.create({
      title: "admin",
      description:
        "Usuário com permissões completas na aplicação, com exceção da funcionalidade de exclusão de usuário.",
    });

    const geralType = await userTypesRepositoryInMemory.create({
      title: "geral",
      description: "Usuário com permissões limitadas as suas informações.",
    });

    const adminUser = await usersRepositoryInMemory.create({
      name: "Joseph Rogers",
      email: "desa@waz.sd",
      password: "123456",
      type_id: adminType.id,
      status: UserStatus.ATIVO,
    });

    adminUser.type = adminType;

    const user = await createUserUseCase.execute({
      name: "Clayton Carson",
      email: "cagpapof@zaf.sv",
      password: "123456",
      type_id: geralType.id,
      status: UserStatus.ATIVO,
      request_user_id: adminUser.id,
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toEqual("Clayton Carson");
  });
});
