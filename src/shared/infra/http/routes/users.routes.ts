import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post("/", ensureAuthenticated, createUserController.handle);
usersRoutes.delete("/:user_id", deleteUserController.handle);

export { usersRoutes };
