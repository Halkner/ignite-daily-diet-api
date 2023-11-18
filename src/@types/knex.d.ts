// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      created_at: string
      updated_at: string
      username: string
      password: number
      email: string
      session_id?: string
    },
    meals: {
        id: string
        created_at: string
        updated_at: string
        name: string
        description: string
        datetime: string
        isInDiet: boolean
    }
  }
}
