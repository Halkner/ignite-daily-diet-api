import { createMealService } from "@infra/services/meal-services";
import { CreateMealController } from "./create-meal.controller";

export const createMealController = new CreateMealController(createMealService)