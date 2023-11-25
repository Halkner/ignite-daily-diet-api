import { User } from '@domain/models/user';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';
import { knex } from '../../../../../database';
import { UserMapper } from '../mappers/user-mapper';

export class UsersRepository
  implements UsersRepositoryAbstract
{
  constructor() {}

  async create(user: User): Promise<void> {
    const raw = UserMapper.toModel(user)

    await knex('users').insert(raw)
  }

  async findById(id: string): Promise<User | null> {
    const user = await knex('users').where('id', id).first()

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await knex('users').where('username', username).first()

    if (!user) return null;

    return UserMapper.toDomain(user);
  }
}
