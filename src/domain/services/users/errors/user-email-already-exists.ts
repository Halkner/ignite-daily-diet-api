export class UserEmailAlreadyExists extends Error {
  constructor(message = 'Email already exists') {
    super(message);
  }
}
