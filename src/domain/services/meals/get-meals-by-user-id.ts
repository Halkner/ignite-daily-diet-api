import { Meal } from '@domain/models/meal';
import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { UserUnauthorized } from '../users/errors/user-unauthorized';

type GetMealsByUserIdRequest = {
    sessionId: string;
}

type GetMealsByUserIdResponse = {
    meals: Meal[];
};

export class GetMealsByUserId {
  constructor(
    private mealsRepository: MealsRepositoryAbstract,
    private usersRepository: UsersRepositoryAbstract
  ) {}

    async execute(props: GetMealsByUserIdRequest): Promise<GetMealsByUserIdResponse> {
        const {sessionId} = props

        const user = await this.usersRepository.findBySessionId(sessionId)

        if (!user) throw new UserUnauthorized()

        const userId = user.id

        try{
          const meals = await this.mealsRepository.findByUserId(userId);

          return { meals };
        }catch(error){
          throw error
        }
    }
}