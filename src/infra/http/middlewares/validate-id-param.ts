import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export function validateIdParam(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply, next: () => void){
    const id = request.params.id
    const idSchema = z.string().uuid()

    const result = idSchema.safeParse(id).success

    if (!result) return reply.status(400).send({error: 'Invalid uuid'})

    next()
}