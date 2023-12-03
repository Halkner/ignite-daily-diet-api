import { FastifyReply, FastifyRequest } from "fastify";
import { UserUnauthorized } from "@domain/services/users/errors/user-unauthorized";
import { DeleteMeal } from "@domain/services/meals/delete-meal";
import { MealNotFound } from "@domain/services/meals/errors/meal-not-found";

export class DeleteMealController {
    constructor(private deleteMeal: DeleteMeal){}

    async handle(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){
        const { id } = request.params
        let { sessionId } = request.cookies

        if (!sessionId) return reply.status(401).send({error: 'Unauthorized'})
  
        try {
        await this.deleteMeal.execute({id, sessionId})
          reply.status(204).send()
        } catch (error) {
            if (error instanceof UserUnauthorized) {
                reply.status(401).send({ error: error.message });
            } else if (error instanceof MealNotFound) {
                reply.status(404).send({ error: error.message });
            } else {
            reply.status(500).send({ error: "Internal Server Error." });
            }
        }
    }
}