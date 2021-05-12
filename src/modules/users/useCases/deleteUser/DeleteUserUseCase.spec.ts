import { UserStatus } from "@modules/users/enums/UserStatus";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UserTypesRepositoryInMemory } from "@modules/users/repositories/in-memory/UserTypesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

let deleteUserUseCase: DeleteUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypesRepositoryInMemory;

describe("Delete User", () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to delete a user", async () => {
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

    const user = await usersRepositoryInMemory.create({
      name: "Joseph Rogers",
      email: "desa@waz.sd",
      password: "123456",
      type_id: 4,
      status: UserStatus.ATIVO,
    });

    await deleteUserUseCase.execute({
      request_user_id: rootUser.id,
      user_id: user.id,
    });

    const result = await usersRepositoryInMemory.findById(user.id);

    expect(result).toBeUndefined();
  });

  it("should not be able to delete a user with an unauthorized requester", async () => {
    const geralType = await userTypesRepositoryInMemory.create({
      title: "geral",
      description:
        "Usuário com permissões limitadas aos seus dados e informações.",
    });

    const requestUser = await usersRepositoryInMemory.create({
      name: "Lora Russell",
      email: "gehsuto@du.bt",
      password: "123456",
      type_id: geralType.id,
      status: UserStatus.ATIVO,
    });

    requestUser.type = geralType;

    await expect(
      deleteUserUseCase.execute({
        request_user_id: requestUser.id,
        user_id: "user-fake-id",
      })
    ).rejects.toEqual(new AppError("User is not authorized", 401));
  });

  it("should not be able to delete a nonexistent user", async () => {
    const rootType = await userTypesRepositoryInMemory.create({
      title: "root",
      description: "Usuário com permissões completas na aplicação.",
    });

    const requestUser = await usersRepositoryInMemory.create({
      name: "Lora Russell",
      email: "gehsuto@du.bt",
      password: "123456",
      type_id: rootType.id,
      status: UserStatus.ATIVO,
    });

    requestUser.type = rootType;

    await expect(
      deleteUserUseCase.execute({
        request_user_id: requestUser.id,
        user_id: "fake-user-id",
      })
    ).rejects.toEqual(new AppError("User does not exists", 404));
  });
});
