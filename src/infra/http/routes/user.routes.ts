import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUserController } from "../controllers/users";
import { CreateUserBody } from "../dtos/users/create-user-body";

export function usersRoutes(app: FastifyInstance, opts: any, done: (err?: Error) => void){
    app.post('/', (request: FastifyRequest<{Body: CreateUserBody}>, reply: FastifyReply) => {
        createUserController.handle(request, reply)
    })

    done()
}