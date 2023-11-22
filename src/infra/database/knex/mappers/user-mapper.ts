import { User } from '@domain/models/user';


export type MappedUser = {
    id: string,
    username: string,
    password: Buffer,
    email: string,
    sessionId: string,
    createdAt: Date,
    updatedAt: Date,
};

export class UserMapper {
  static toModel(user: User): MappedUser {
    return {
        id: user.id,
        username: user.username,
        password: Buffer.from(user.password, 'utf-8'),
        email: user.email,
        sessionId: user.sessionId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: MappedUser): User {
    return new User({
      id: raw.id,
      username: raw.username,
      password: raw.password.toString(),
      email: raw.email,
      sessionId: raw.sessionId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
