export class UserNameAlreadyExists extends Error {
  constructor(message = 'Username already exists') {
    super(message);
  }
}
