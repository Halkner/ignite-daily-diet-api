export class UserUnauthorized extends Error {
    constructor(message = 'User unauthorized') {
      super(message);
    }
  }
  