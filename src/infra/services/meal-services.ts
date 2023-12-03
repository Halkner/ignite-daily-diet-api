import { CreateMeal } from "@domain/services/meals/create-meal";
import { DeleteMeal } from "@domain/services/meals/delete-meal";
import { EditMeal } from "@domain/services/meals/edit-meal";
import { GetMealById } from "@domain/services/meals/get-meal-by-id";
import { GetMealsByUserId } from "@domain/services/meals/get-meals-by-user-id";
import { usersRepository } from "@infra/database/knex/repositories";
import { mealsRepository } from "@infra/database/knex/repositories";

export const createMealService = new CreateMeal(mealsRepository, usersRepository)
export const getMealsByUserIdService = new GetMealsByUserId(mealsRepository, usersRepository)
export const getMealByIdService = new GetMealById(mealsRepository, usersRepository)
export const editMealService = new EditMeal(mealsRepository, usersRepository)
export const deleteMealService = new DeleteMeal(mealsRepository, usersRepository)