import { Meal } from '@domain/models/meal';
import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { MealNotFound } from './errors/meal-not-found';
import { UserUnauthorized } from '../users/errors/user-unauthorized';

type DeleteMealRequest = {
    id: string;
    sessionId: string;
}

type DeleteMealResponse = void

export class DeleteMeal {
  constructor(
    private mealsRepository: MealsRepositoryAbstract,
    private usersRepository: UsersRepositoryAbstract
  ) {}

    async execute(props: DeleteMealRequest): Promise<DeleteMealResponse> {
        const {id, sessionId} = props

        const user = await this.usersRepository.findBySessionId(sessionId)

        if (!user) throw new UserUnauthorized()

        const userId = user.id

        const meal = await this.mealsRepository.findById(id, userId)

        if (!meal) throw new MealNotFound()

        await this.mealsRepository.deleteById(id)
    }
}