import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { knex } from '../database'

export const app = fastify()

app.get('/hello', async (_, response) => {
    const users = await knex('meals').select('meals.*', 'users.username as user_username').join('users', 'meals.user_id', 'users.id')
    response.status(200).send(users)
})

app.register(cookie)
