// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      createdAt: Date
      updatedAt: Date
      username: string
      password: Buffer
      email: string
      sessionId: string
    },
    meals: {
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      description: string
      datetime: string
      isDietMeal: number // 0 - false, 1 - true
      userId: string
    }
  }
}
