import { Meal } from '@domain/models/meal';
import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { UserUnauthorized } from '../users/errors/user-unauthorized';

type CreateMealRequest = {
  name: string;
  description: string;
  datetime: string;
  isDietMeal: boolean;
  sessionId: string;
};

type CreateMealResponse = {
  meal: Meal;
};

export class CreateMeal {
  constructor(
    private mealsRepository: MealsRepositoryAbstract,
    private usersRepository: UsersRepositoryAbstract
  ) { }

  async execute(props: CreateMealRequest): Promise<CreateMealResponse> {
    const { name, description, datetime, isDietMeal, sessionId } = props;

    const user = await this.usersRepository.findBySessionId(sessionId)

    if (!user) throw new UserUnauthorized()

    const meal = new Meal({ name, description, datetime, isDietMeal, userId: user.id, user });

    try {
      await this.mealsRepository.create(meal);
      return { meal };
    } catch (error) {
      throw error;
    }
  }
}
