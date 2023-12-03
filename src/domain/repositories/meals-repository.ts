import { Meal } from "@domain/models/meal";

export abstract class MealsRepositoryAbstract {
    abstract create(meal: Meal): Promise<void>
    abstract findByUserId(userId: string): Promise<Meal[]>
}