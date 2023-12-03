import { createMealService, deleteMealService, getMealByIdService, getMealsByUserIdService } from "@infra/services/meal-services";
import { CreateMealController } from "./create-meal.controller";
import { GetMealsByUserIdController } from "./get-meals-by-user-id.controller";
import { GetMealByIdController } from "./get-meal-by-id.controller";
import { DeleteMealController } from "./delete-meal.controller";

export const createMealController = new CreateMealController(createMealService)
export const getMealsByUserIdController = new GetMealsByUserIdController(getMealsByUserIdService)
export const getMealsByIdController = new GetMealByIdController(getMealByIdService)
export const deleteMealController = new DeleteMealController(deleteMealService)