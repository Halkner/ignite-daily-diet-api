import { CreateUser } from "@domain/services/users/create-user";
import { usersRepository } from "@infra/database/knex/repositories";
import { bcryptProvider } from "@infra/providers";

export const createUserService = new CreateUser(bcryptProvider, usersRepository)