export class UserAlreadyExists extends Error {
  constructor(message = 'User already exists') {
    super(message);
  }
}
