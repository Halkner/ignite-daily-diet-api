import { CreateUser } from "@domain/services/users/create-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody, createUserBodySchema } from "../../dtos/users/create-user-body";
import { randomUUID } from "crypto";
import { UserNameAlreadyExists } from "@domain/services/users/errors/user-name-already-exists";

export class CreateUserController {
    constructor(private createUser: CreateUser){}

    async handle(request: FastifyRequest<{Body: CreateUserBody}>, reply: FastifyReply){
        const {body} = request
        const validatedData = createUserBodySchema.safeParse(request.body)

        if(!validatedData.success){
          reply.status(400).send(validatedData.error.issues.map(issue => issue.message))
        }

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
          sessionId = randomUUID()
          reply.cookie('sessionId', sessionId, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          })
        }
  
        try {
          const { user } = await this.createUser.execute({...body, sessionId})
          reply.status(201).send(user);
        } catch (error) {
          if (error instanceof UserNameAlreadyExists) {
            reply.status(400).send({ error: error.message });
          } else {
            reply.status(500).send({ error: "Internal Server Error." });
          }
        }
    }
}