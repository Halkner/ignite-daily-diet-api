import { FastifyReply, FastifyRequest } from "fastify";
import { UserNotFound } from "@domain/services/users/errors/user-not-found";
import { GetMealById } from "@domain/services/meals/get-meal-by-id";
import { validateIdParam } from "@infra/utils/validate-id-param";

export class GetMealByIdController {
    constructor(private getMealById: GetMealById){}

    async handle(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){
        const { id } = request.params
        let { sessionId } = request.cookies

        if (!sessionId) return reply.status(401).send({error: 'Unauthorized'})

        const isValidId = validateIdParam(id)

        if(!isValidId) return reply.status(400).send({error: 'Invalid uuid'})
  
        try {
          const { meal } = await this.getMealById.execute({id, sessionId})
          reply.status(201).send(meal);
        } catch (error) {
            if (error instanceof UserNotFound) {
                reply.status(404).send({ error: error.message });
            } else {
            reply.status(500).send({ error: "Internal Server Error." });
            }
        }
    }
}