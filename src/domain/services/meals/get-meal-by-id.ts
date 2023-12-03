import { Meal } from '@domain/models/meal';
import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { MealNotFound } from './errors/meal-not-found';
import { UserNotFound } from '../users/errors/user-not-found';

type GetMealByIdRequest = {
    id: string;
    sessionId: string;
}

type GetMealByIdResponse = {
    meal: Meal;
};

export class GetMealById {
  constructor(
    private mealsRepository: MealsRepositoryAbstract,
    private usersRepository: UsersRepositoryAbstract
  ) {}

    async execute(props: GetMealByIdRequest): Promise<GetMealByIdResponse> {
        const {id, sessionId} = props

        const user = await this.usersRepository.findBySessionId(sessionId)

        if (!user) throw new UserNotFound()

        const userId = user.id

        const meal = await this.mealsRepository.findById(id, userId)

        if (!meal) throw new MealNotFound()

        return { meal }
    }
}