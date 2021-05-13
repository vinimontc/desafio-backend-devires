import { UserStatus } from "@modules/users/enums/UserStatus";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UserTypesRepositoryInMemory } from "@modules/users/repositories/in-memory/UserTypesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

let updateUserUseCase: UpdateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypesRepositoryInMemory;

describe("Update User", () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(
      usersRepositoryInMemory,
      userTypesRepositoryInMemory
    );
  });

  it("should be able to update a user", async () => {
    const rootType = await userTypesRepositoryInMemory.create({
      title: "root",
      description: "Usuário com permissões completas na aplicação.",
    });

    const adminType = await userTypesRepositoryInMemory.create({
      title: "admin",
      description:
        "Usuário com permissões completas na aplicação, com exceção da funcionalidade de exclusão de usuário.",
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

    const user = await usersRepositoryInMemory.create({
      name: "Lillian Blair",
      email: "cubzasav@lu.cu",
      password: "123456",
      type_id: geralType.id,
      status: UserStatus.ATIVO,
    });

    user.type = geralType;

    await updateUserUseCase.execute({
      name: "Nome atualizado",
      email: "email.atualizado@mail.com",
      password: "senha atualizada",
      type_id: adminType.id,
      request_user_id: rootUser.id,
      user_id: user.id,
    });

    const userUpdated = await usersRepositoryInMemory.findById(user.id);

    expect(userUpdated.name).toEqual("Nome atualizado");
    expect(userUpdated.email).toEqual("email.atualizado@mail.com");
    expect(userUpdated.type_id).toEqual(adminType.id);
  });

  it("should not be able to update a user with an unauthorized requester", async () => {
    const geralType = await userTypesRepositoryInMemory.create({
      title: "geral",
      description: "Usuário com permissões limitadas as suas informações.",
    });

    const normalUser = await usersRepositoryInMemory.create({
      name: "Joseph Rogers",
      email: "desa@waz.sd",
      password: "123456",
      type_id: geralType.id,
      status: UserStatus.ATIVO,
    });

    normalUser.type = geralType;

    const user = await usersRepositoryInMemory.create({
      name: "Lillian Blair",
      email: "cubzasav@lu.cu",
      password: "123456",
      type_id: geralType.id,
      status: UserStatus.ATIVO,
    });

    await expect(
      updateUserUseCase.execute({
        name: "Nome atualizado",
        email: "email.atualizado@mail.com",
        password: "senha atualizada",
        request_user_id: normalUser.id,
        user_id: user.id,
      })
    ).rejects.toEqual(new AppError("User is not authorized", 401));
  });
});
