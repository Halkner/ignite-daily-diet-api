import { Replace } from '../../helpers/replace';
import { BaseProps } from '../base/types';
import { Meal } from '../meals'

export type PrivateUser = {
  username: string;
  password: string | null;
  email: string;
  sessionId: string;

  meals?: Meal[];
};

export type UserProps = BaseProps &
  Replace<
    PrivateUser,
    {
      password?: string | null;
    }
  >;
