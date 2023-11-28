import { Meal } from '@domain/models/meal';
import { FromModelUser, UserMapper } from './user-mapper';


export type ToModelMeal = {
    id: string,
    name: string,
    description: string,
    datetime: string,
    isDietMeal: number,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
};

export type FromModelMeal = {
    id: string,
    name: string,
    description: string,
    datetime: string,
    isDietMeal: number,
    userId: string,
    createdAt: Date,
    updatedAt: Date,

    user?: FromModelUser
};

export class MealMapper {
  static toModel(meal: Meal): ToModelMeal {
    return {
        id: meal.id,
        name: meal.name,
        description: meal.description,
        datetime: meal.datetime,
        isDietMeal: meal.isDietMeal ? 1 : 0, // 0 - false, 1 - true
        userId: meal.userId,
        createdAt: meal.createdAt,
        updatedAt: meal.updatedAt,
    };
  }

  static toDomain(model: FromModelMeal): Meal {
    return new Meal({
      id: model.id,
      name: model.name,
      description: model.description,
      datetime: model.datetime,
      isDietMeal: !!model.isDietMeal,
      userId: model.userId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,

      user: model.user && UserMapper.toDomain(model.user)
    });
  }
}
