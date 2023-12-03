export class MealNotFound extends Error {
    constructor(message = 'Meal not found') {
      super(message);
    }
  }
  