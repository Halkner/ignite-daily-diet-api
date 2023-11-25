import { User } from "@domain/models/user";

export abstract class UsersRepositoryAbstract {
    abstract create(user: User): Promise<void>
    abstract findById(id: string): Promise<User | null>
    abstract findByUsername(username: string): Promise<User | null>;
}