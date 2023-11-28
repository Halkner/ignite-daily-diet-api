import { createMealService, listMealsService } from "@infra/services/meal-services";
import { CreateMealController } from "./create-meal.controller";
import { ListMealsController } from "./list-meals.controller";

export const createMealController = new CreateMealController(createMealService)
export const listMealsController = new ListMealsController(listMealsService)