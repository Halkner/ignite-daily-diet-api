import { CreateMeal } from "@domain/services/meals/create-meal";
import { GetMealsByUserId } from "@domain/services/meals/get-meals-by-user-id";
import { usersRepository } from "@infra/database/knex/repositories";
import { mealsRepository } from "@infra/database/knex/repositories";

export const createMealService = new CreateMeal(mealsRepository, usersRepository)
export const getMealsByUserIdService = new GetMealsByUserId(mealsRepository, usersRepository)