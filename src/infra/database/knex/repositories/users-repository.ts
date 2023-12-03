import { User } from '@domain/models/user';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { knex } from '../../../../../database';
import { UserMapper } from '../mappers/user-mapper';

export class UsersRepository
  implements UsersRepositoryAbstract {
  constructor() { }

  async create(user: User): Promise<void> {
    const raw = UserMapper.toModel(user)

    await knex('users').insert(raw)
  }

  async findBySessionId(sessionId: string): Promise<User | null> {
    const user = await knex('users').where('sessionId', sessionId).first()

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await knex('users').where('username', username).first()

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await knex('users').where('email', email).first()

    if (!user) return null;

    return UserMapper.toDomain(user);
  }
}
