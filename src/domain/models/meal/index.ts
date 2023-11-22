import { Base } from '../base';
import { User } from '../user';
import { MealProps, PrivateMeal } from './types';

export class Meal extends Base {
  private props: PrivateMeal;

  constructor(props: MealProps) {
    super(props);

    this.props = {
      name: props.name,
      description: props.description,
      datetime: props.datetime,
      isInDiet: props.isInDiet,
      userId: props.userId,

      user: props.user,
    };
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get description() {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get datetime() {
    return this.props.datetime;
  }

  public set datetime(datetime: string) {
    this.props.datetime = datetime;
  }

  public get isInDiet() {
    return this.props.isInDiet;
  }

  public set isInDiet(isInDiet: boolean) {
    this.props.isInDiet = isInDiet;
  }

  public get userId() {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get user() {
    return this.props.user;
  }

  public set user(user: User) {
    this.props.user = user;
  }
}
