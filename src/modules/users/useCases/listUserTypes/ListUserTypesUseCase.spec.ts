import { UserStatus } from "@modules/users/enums/UserStatus";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UserTypesRepositoryInMemory } from "@modules/users/repositories/in-memory/UserTypesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { ListUserTypesUseCase } from "./ListUserTypesUseCase";

let listUserTypesUseCase: ListUserTypesUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypesRepositoryInMemory;

describe("Delete User", () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUserTypesUseCase = new ListUserTypesUseCase(
      usersRepositoryInMemory,
      userTypesRepositoryInMemory
    );
  });

  it("should be able to list all user types", async () => {
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

    const allTypes = await listUserTypesUseCase.execute(rootUser.id);

    expect(allTypes).toHaveLength(1);
    expect(allTypes[0].id).toEqual(rootType.id);
  });

  it("should not be able to delete a user with an unauthorized requester", async () => {
    const geralType = await userTypesRepositoryInMemory.create({
      title: "geral",
      description: "Usuário com permissões limitadas as suas informações.",
    });

    const requestUser = await usersRepositoryInMemory.create({
      name: "Lora Russell",
      email: "gehsuto@du.bt",
      password: "123456",
      type_id: geralType.id,
      status: UserStatus.ATIVO,
    });

    await expect(listUserTypesUseCase.execute(requestUser.id)).rejects.toEqual(
      new AppError("User is not authorized", 401)
    );
  });
});
