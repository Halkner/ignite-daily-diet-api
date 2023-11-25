import { User } from '@domain/models/user';
import { FromModelMeal, MealMapper } from './meal-mapper';


export type ToModelUser = {
    id: string,
    username: string,
    password: Buffer,
    email: string,
    sessionId: string,
    createdAt: Date,
    updatedAt: Date,
};

export type FromModelUser = {
  id: string,
  username: string,
  password: Buffer,
  email: string,
  sessionId: string,
  createdAt: Date,
  updatedAt: Date,

  meals?: FromModelMeal[]
};

export class UserMapper {
  static toModel(user: User): ToModelUser {
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

  static toDomain(model: FromModelUser): User {
    return new User({
      id: model.id,
      username: model.username,
      password: model.password.toString(),
      email: model.email,
      sessionId: model.sessionId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,

      meals: model.meals && model.meals.map(MealMapper.toDomain)
    });
  }
}
