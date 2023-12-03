import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createMealController, deleteMealController, editMealController, getMealsByIdController, getMealsByUserIdController, getMealsSummaryController } from "../controllers/meals";
import { CreateMealBody } from "../dtos/meals/create-meal-body";
import { validateIdParam } from "../middlewares/validate-id-param";
import { EditMealBody } from "../dtos/meals/edit-meal-body";

export function mealsRoutes(app: FastifyInstance, opts: any, done: (err?: Error) => void) {
    app.post('/', (request: FastifyRequest<{ Body: CreateMealBody }>, reply: FastifyReply) => {
        createMealController.handle(request, reply)
    })

    app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        getMealsByUserIdController.handle(request, reply)
    })

    app.get('/:id', { preHandler: [validateIdParam] }, (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        getMealsByIdController.handle(request, reply)
    })

    app.delete('/:id', { preHandler: [validateIdParam] }, (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        deleteMealController.handle(request, reply)
    })

    app.get('/summary', (request: FastifyRequest, reply: FastifyReply) => {
        getMealsSummaryController.handle(request, reply)
    })

    app.patch('/:id', { preHandler: [validateIdParam] }, (request: FastifyRequest<{ Params: { id: string }, Body: EditMealBody }>, reply: FastifyReply) => {
        editMealController.handle(request, reply)
    })

    done()
}