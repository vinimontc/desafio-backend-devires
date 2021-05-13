import { UserStatus } from "@modules/users/enums/UserStatus";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UserTypesRepositoryInMemory } from "@modules/users/repositories/in-memory/UserTypesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypesRepositoryInMemory;

describe("Show User Profile", () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to show a user profile", async () => {
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

    const user = await usersRepositoryInMemory.create({
      name: "Lillian Blair",
      email: "cubzasav@lu.cu",
      password: "123456",
      type_id: geralType.id,
      status: UserStatus.ATIVO,
    });

    user.type = geralType;

    const userProfile = await showUserProfileUseCase.execute({
      request_user_id: rootUser.id,
      user_id: user.id,
    });

    expect(userProfile).toHaveProperty("name");
    expect(userProfile).toHaveProperty("type");
    expect(userProfile.type).toEqual(geralType.title);
  });

  it("should not be able to list a user profile with an unauthorized requester", async () => {
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

    user.type = geralType;

    await expect(
      showUserProfileUseCase.execute({
        request_user_id: normalUser.id,
        user_id: user.id,
      })
    ).rejects.toEqual(new AppError("User is not authorized", 401));
  });
});
