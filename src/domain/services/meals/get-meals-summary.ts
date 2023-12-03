import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { UserUnauthorized } from '../users/errors/user-unauthorized';

type GetMealsSummaryRequest = {
    sessionId: string;
}

type Summary = {
    totalMeals: number;
    totalMealsWithinDiet: number;
    totalMealsWithoutDiet: number;
    betterSequenceCount: number;
}

type GetMealsSummaryResponse = {
    summary: Summary;
};

export class GetMealsSummary {
    constructor(
        private mealsRepository: MealsRepositoryAbstract,
        private usersRepository: UsersRepositoryAbstract
    ) { }

    async execute(props: GetMealsSummaryRequest): Promise<GetMealsSummaryResponse> {
        const { sessionId } = props

        const user = await this.usersRepository.findBySessionId(sessionId)

        if (!user) throw new UserUnauthorized()

        const userId = user.id

        const meals = await this.mealsRepository.findByUserId(userId);

        const metrics = meals.reduce(
            (acc, meal) => {
                acc.totalMeals += 1;

                if (meal.isDietMeal === false) {
                    acc.totalMealsWithoutDiet += 1;
                    acc.actualSequenceCount = 0;
                } else {
                    acc.totalMealsWithinDiet += 1;
                    acc.actualSequenceCount += 1;

                    if (acc.actualSequenceCount > acc.betterSequenceCount) {
                        acc.betterSequenceCount = acc.actualSequenceCount;
                    }
                }

                return acc;
            },
            {
                totalMeals: 0,
                totalMealsWithinDiet: 0,
                totalMealsWithoutDiet: 0,
                betterSequenceCount: 0,
                actualSequenceCount: 0,
            }
        );

        return {
            summary: {
                totalMeals: metrics.totalMeals,
                totalMealsWithinDiet: metrics.totalMealsWithinDiet,
                totalMealsWithoutDiet: metrics.totalMealsWithoutDiet,
                betterSequenceCount: metrics.betterSequenceCount
            }
        };
    }
}