import { UserStatus } from "@modules/users/enums/UserStatus";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UserTypesRepositoryInMemory } from "@modules/users/repositories/in-memory/UserTypesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { UpdateStatusUseCase } from "./UpdateStatusUseCase";

let updateStatusUseCase: UpdateStatusUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypesRepositoryInMemory;

describe("Update User Status", () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    updateStatusUseCase = new UpdateStatusUseCase(usersRepositoryInMemory);
  });

  it("should be able to update a user status", async () => {
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
      name: "Lillian Blair",
      email: "cubzasav@lu.cu",
      password: "123456",
      type_id: 100,
      status: UserStatus.ATIVO,
    });

    await updateStatusUseCase.execute({
      request_user_id: rootUser.id,
      user_id: user.id,
    });

    const userUpdated = await usersRepositoryInMemory.findById(user.id);

    expect(userUpdated.status).toEqual("inativo");
  });
});
