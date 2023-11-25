import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { usersRoutes } from '@infra/http/routes/user.routes'
import { knex } from '../database'
import { mealsRoutes } from '@infra/http/routes/meal.routes'

export const app = fastify()

app.register(cookie)

app.get('/hello', async (_, response) => {
    const users = await knex('users').select('*')
    response.status(200).send(users)
})

app.register(usersRoutes, {
    prefix: 'users'
})

app.register(mealsRoutes, {
    prefix: 'meals'
})

