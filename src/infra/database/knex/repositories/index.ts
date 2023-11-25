import { MealsRepository } from "./meals-repository";
import { UsersRepository } from "./users-repository";

export const usersRepository = new UsersRepository()
export const mealsRepository = new MealsRepository()