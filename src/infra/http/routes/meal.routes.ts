import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createMealController, getMealsByIdController, getMealsByUserIdController } from "../controllers/meals";
import { CreateMealBody } from "../dtos/meals/create-meal-body";

export function mealsRoutes(app: FastifyInstance, opts: any, done: (err?: Error) => void){
    app.post('/', (request: FastifyRequest<{Body: CreateMealBody}>, reply: FastifyReply) => {
        createMealController.handle(request, reply)
    })
    app.get('/', (request: FastifyRequest, reply: FastifyReply ) => {
        getMealsByUserIdController.handle(request, reply)
    })

    app.get('/:id', (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply ) => {
        getMealsByIdController.handle(request, reply)
    })

    done()
}