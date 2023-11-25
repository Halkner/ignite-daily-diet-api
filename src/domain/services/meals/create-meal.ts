import { Meal } from '@domain/models/meal';
import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { UserNotFound } from '../users/errors/user-not-found';

type CreateMealRequest = {
    name: string;
    description: string;
    datetime: string;
    isDietMeal: boolean;
    userId: string;
};

type CreateMealResponse = {
  meal: Meal;
};

export class CreateMeal {
  constructor(
    private mealsRepository: MealsRepositoryAbstract,
    private usersRepository: UsersRepositoryAbstract
  ) {}

  async execute(props: CreateMealRequest): Promise<CreateMealResponse> {
    const { name, description, datetime, isDietMeal, userId } = props;

    const user = await this.usersRepository.findById(userId)

    if(!user) throw new UserNotFound()

    const meal = new Meal({ name, description, datetime, isDietMeal, userId, user });

    try {
      await this.mealsRepository.create(meal);
      return { meal };
    } catch (error) {
      throw error;
    }
  }
}
