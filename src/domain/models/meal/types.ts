import { Replace } from '../../helpers/replace';
import { BaseProps } from '../base/types';
import { User } from '../user';

export type PrivateMeal = {
  name: string;
  description: string;
  datetime: string;
  isInDiet: boolean;
  userId: string;

  user: User;
};

export type MealProps = BaseProps & PrivateMeal
  