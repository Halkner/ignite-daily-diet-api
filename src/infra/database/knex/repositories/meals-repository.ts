import { Meal } from '@domain/models/meal';
import { MealsRepositoryAbstract } from '@domain/repositories/meals-repository';
import { knex } from '../../../../../database';
import { MealMapper } from '../mappers/meal-mapper';

export class MealsRepository
  implements MealsRepositoryAbstract
{
  constructor() {}

  async create(meal: Meal): Promise<void> {

    const raw = MealMapper.toModel(meal)
    console.log(raw)
      
    await knex('meals').insert(raw)
  }

  async findByUserId(userId: string): Promise<Meal[]> {
    const meals = await knex('meals').select().where('userId', userId)

    return meals.map(MealMapper.toDomain)
  }
  
  async findById(id: string, userId: string): Promise<Meal | null> {
    const meal = await knex('meals').first().where('userId', userId).andWhere('id', id)

    if (!meal) return null

    return MealMapper.toDomain(meal)
  }

  async deleteById(id: string): Promise<void> {
    await knex('meals').where('id', id).del()
  }
}
