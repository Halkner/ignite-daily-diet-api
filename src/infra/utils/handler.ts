import { FastifyReply, FastifyRequest } from "fastify";

export function handler(controller: any) {
    return function(req: FastifyRequest, reply: FastifyReply) {
      controller(req, reply);
    };
  }