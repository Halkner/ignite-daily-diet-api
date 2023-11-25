import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createMealController } from "../controllers/meals";
import { CreateMealBody } from "../dtos/meals/create-meal-body";

export function mealsRoutes(app: FastifyInstance, opts: any, done: (err?: Error) => void){
    app.post('/', (request: FastifyRequest<{Body: CreateMealBody}>, reply: FastifyReply) => {
        createMealController.handle(request, reply)
    })

    done()
}