import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ListUserTypesController } from "@modules/users/useCases/listUserTypes/ListUserTypesController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listUserTypesController = new ListUserTypesController();

usersRoutes.post("/", ensureAuthenticated, createUserController.handle);
usersRoutes.delete(
  "/:user_id",
  ensureAuthenticated,
  deleteUserController.handle
);
usersRoutes.get("/types", ensureAuthenticated, listUserTypesController.handle);

export { usersRoutes };
