import { FastifyReply, FastifyRequest } from "fastify";
import { ListMeals } from "@domain/services/meals/list-meals";

export class ListMealsController {
    constructor(private listMeals: ListMeals){}

    async handle(request: FastifyRequest, reply: FastifyReply){
        let sessionId = request.cookies.sessionId
        if (!sessionId) return reply.status(401).send({error: 'Unauthorized'})
  
        try {
          const { meals } = await this.listMeals.execute()
          reply.status(201).send(meals);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error." });
        }
    }
}