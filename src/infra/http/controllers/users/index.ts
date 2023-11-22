import { createUserService } from "@infra/services/user-services";
import { CreateUserController } from "./create-user.controller";

export const createUserController = new CreateUserController(createUserService)