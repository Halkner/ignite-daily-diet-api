import { FastifyReply, FastifyRequest } from "fastify";
import { GetMealsByUserId } from "@domain/services/meals/get-meals-by-user-id";

export class GetMealsByUserIdController {
    constructor(private listMeals: GetMealsByUserId){}

    async handle(request: FastifyRequest, reply: FastifyReply){
        let sessionId = request.cookies.sessionId
        if (!sessionId) return reply.status(401).send({error: 'Unauthorized'})
  
        try {
          const { meals } = await this.listMeals.execute({sessionId})
          reply.status(201).send(meals);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error." });
        }
    }
}