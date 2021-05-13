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
});
