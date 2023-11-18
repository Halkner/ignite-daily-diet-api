import fastify from 'fastify'
import cookie from '@fastify/cookie'

export const app = fastify()

app.get('/hello', (_, response) => {
    response.status(200).send("Hello, World!")
})

app.register(cookie)
