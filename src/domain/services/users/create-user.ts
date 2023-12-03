import { User } from '@domain/models/user';
import { CryptProvider } from '@domain/providers/crypt-provider';
import { UsersRepositoryAbstract } from '@domain/repositories/users-repository';

import { UserNameAlreadyExists } from './errors/user-name-already-exists';
import { UserEmailAlreadyExists } from './errors/user-email-already-exists';

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
    const userNameAlreadyExists = await this.usersRepository.findByUsername(
      username,
    );

    if (userNameAlreadyExists) throw new UserNameAlreadyExists();

    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userEmailAlreadyExists) throw new UserEmailAlreadyExists();

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
