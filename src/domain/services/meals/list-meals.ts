import { Meal } from '@domain/models/meal';
import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';

type ListMealsResponse = {
  meals: Meal[];
};

export class ListMeals {
  constructor(
    private mealsRepository: MealsRepositoryAbstract,
  ) {}

    async execute(): Promise<ListMealsResponse> {
      const meals = await this.mealsRepository.list();
      return { meals };
    }
}