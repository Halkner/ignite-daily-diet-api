import { CreateUser } from "@domain/services/users/create-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody, createUserBodySchema } from "../../dtos/users/create-user-body";
import { randomUUID } from "crypto";
import { UserAlreadyExists } from "@domain/services/users/errors/user-already-exists";

export class CreateUserController {
    constructor(private createUser: CreateUser){}

    async handle(request: FastifyRequest<{Body: CreateUserBody}>, reply: FastifyReply){
        const validatedData = createUserBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
          sessionId = randomUUID()
          reply.cookie('sessionId', sessionId, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          })
        }
  
        try {
          const { user } = await this.createUser.execute({...validatedData, sessionId})
          reply.status(201).send(user);
        } catch (error) {
          if (error instanceof UserAlreadyExists) {
            reply.status(error.statusCode).send({ error: error.message });
          } else {
            reply.status(500).send({ error: "Internal Server Error." });
          }
        }
    }
}