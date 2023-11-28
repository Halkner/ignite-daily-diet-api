import { CreateMeal } from "@domain/services/meals/create-meal";
import { ListMeals } from "@domain/services/meals/list-meals";
import { usersRepository } from "@infra/database/knex/repositories";
import { mealsRepository } from "@infra/database/knex/repositories";

export const createMealService = new CreateMeal(mealsRepository, usersRepository)
export const listMealsService = new ListMeals(mealsRepository)