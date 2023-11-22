export class UserAlreadyExists extends Error {
    statusCode: number
  constructor(message = '[DD001]: User already exists') {
    super(message);
    this.statusCode = 409
  }
}
