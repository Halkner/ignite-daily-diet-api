import { Base } from '../base';
import { Meal } from '../meal';
import { UserProps, PrivateUser } from './types';

export class User extends Base {
  private props: PrivateUser;

  constructor(props: UserProps) {
    super(props);

    this.props = {
      username: props.username,
      password: props.password,
      email: props.email,
      sessionId: props.sessionId,

      meals: props.meals,
    };
  }

  public get username() {
    return this.props.username;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get password() {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get email() {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get sessionId() {
    return this.props.sessionId;
  }

  public set sessionId(sessionId: string) {
    this.props.sessionId = sessionId;
  }

  public get meals() {
    return this.props.meals;
  }

  public set meals(meals: Meal[] | undefined) {
    this.props.meals = meals;
  }
  
}
