import { Meal } from '@domain/models/meal';
import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { UserUnauthorized } from '../users/errors/user-unauthorized';
import { MealNotFound } from './errors/meal-not-found';
import { assignIn } from '@domain/helpers/assign-in';

type EditMealRequest = {
  id: string;
  name?: string;
  description?: string;
  datetime?: string;
  isDietMeal?: boolean;
  sessionId: string;
};

type EditMealResponse = {
  meal: Meal;
};

export class EditMeal {
  constructor(
    private mealsRepository: MealsRepositoryAbstract,
    private usersRepository: UsersRepositoryAbstract
  ) { }

  async execute(props: EditMealRequest): Promise<EditMealResponse> {
    const { id, name, description, datetime, isDietMeal, sessionId } = props;

    const user = await this.usersRepository.findBySessionId(sessionId)

    if (!user) throw new UserUnauthorized()

    const userId = user.id

    const meal = await this.mealsRepository.findById(id, userId)

    if (!meal) throw new MealNotFound()

    assignIn(meal, {
      name,
      description,
      datetime,
      isDietMeal
    })

    try {
      await this.mealsRepository.save(meal);
      return { meal };
    } catch (error) {
      throw error;
    }
  }
}
