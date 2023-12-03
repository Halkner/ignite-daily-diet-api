import { Meal } from "@domain/models/meal";

export abstract class MealsRepositoryAbstract {
    abstract create(meal: Meal): Promise<void>
    abstract findById(id: string, userId: string): Promise<Meal | null>
    abstract findByUserId(userId: string): Promise<Meal[]>
    abstract deleteById(id: string): Promise<void>
}