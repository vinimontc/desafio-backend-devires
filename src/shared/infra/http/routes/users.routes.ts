import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ListUserTypesController } from "@modules/users/useCases/listUserTypes/ListUserTypesController";
import { ShowUserProfileController } from "@modules/users/useCases/showUserProfile/ShowUserProfileController";
import { UpdateStatusController } from "@modules/users/useCases/updateStatus/UpdateStatusController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listUserTypesController = new ListUserTypesController();
const showUserProfileController = new ShowUserProfileController();
const updateStatusController = new UpdateStatusController();
const updateUserController = new UpdateUserController();

usersRoutes.post("/", ensureAuthenticated, createUserController.handle);
usersRoutes.delete(
  "/:user_id",
  ensureAuthenticated,
  deleteUserController.handle
);
usersRoutes.get("/types", ensureAuthenticated, listUserTypesController.handle);
usersRoutes.get(
  "/profile/:user_id",
  ensureAuthenticated,
  showUserProfileController.handle
);
usersRoutes.patch(
  "/status/:user_id",
  ensureAuthenticated,
  updateStatusController.handle
);
usersRoutes.put("/:user_id", ensureAuthenticated, updateUserController.handle);

export { usersRoutes };
