import { Replace } from '@domain/helpers/replace';
import { BaseProps } from '../base/types';
import { Meal } from '../meal'

export type PrivateUser = {
  username: string;
  password: string;
  email: string;
  sessionId: string;

  meals?: Meal[];
};

export type UserProps = BaseProps & PrivateUser;


