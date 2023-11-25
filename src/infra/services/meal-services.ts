import { CreateMeal } from "@domain/services/meals/create-meal";
import { usersRepository } from "@infra/database/knex/repositories";
import { mealsRepository } from "@infra/database/knex/repositories";

export const createMealService = new CreateMeal(mealsRepository, usersRepository)