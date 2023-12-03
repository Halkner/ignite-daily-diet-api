import { createMealService, getMealsByUserIdService } from "@infra/services/meal-services";
import { CreateMealController } from "./create-meal.controller";
import { GetMealsByUserIdController } from "./get-meals-by-user-id.controller";

export const createMealController = new CreateMealController(createMealService)
export const getMealsByUserIdController = new GetMealsByUserIdController(getMealsByUserIdService)