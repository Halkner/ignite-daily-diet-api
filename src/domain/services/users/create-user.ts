import { User } from '@domain/models/user';
import { CryptProvider } from '@domain/providers/crypt-provider';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';

import { UserAlreadyExists } from './errors/user-already-exists';

type CreateUserRequest = {
  username: string;
  password: string;
  email: string;
  sessionId: string;
};

type CreateUserResponse = {
  user: User;
};

export class CreateUser {
  constructor(
    private cryptProvider: CryptProvider,
    private usersRepository: UsersRepositoryAbstract,
  ) {}

  async execute(props: CreateUserRequest): Promise<CreateUserResponse> {
    const { username, password, email, sessionId } = props;

    console.log(username)
    const userAlreadyExists = await this.usersRepository.findByUsername(
      username,
    );

    if (userAlreadyExists) throw new UserAlreadyExists();

    const hashedPassword = await this.cryptProvider.hash(password);

    const user = new User({ username, password: hashedPassword, email, sessionId });

    try {
      await this.usersRepository.create(user);
      return { user };
    } catch (error) {
      throw error;
    }
  }
}
