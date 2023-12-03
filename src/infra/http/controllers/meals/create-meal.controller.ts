import { CreateMeal } from "@domain/services/meals/create-meal";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateMealBody, createMealBodySchema } from "@http/dtos/meals/create-meal-body";
import { UserNotFound } from "@domain/services/users/errors/user-not-found";

export class CreateMealController {
    constructor(private createMeal: CreateMeal){}

    async handle(request: FastifyRequest<{Body: CreateMealBody}>, reply: FastifyReply){
        const {body} = request
        let { sessionId } = request.cookies

        const validatedData = createMealBodySchema.safeParse(request.body)

        if(!validatedData.success){
          reply.status(400).send(validatedData.error.issues.map(issue => issue.message))
        }

        if (!sessionId) return reply.status(401).send({error: 'Unauthorized'})

        console.log(body)
  
        try {
          const { meal } = await this.createMeal.execute({...body, sessionId})
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