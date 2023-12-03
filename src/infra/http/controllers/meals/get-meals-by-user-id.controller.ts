import { FastifyReply, FastifyRequest } from "fastify";
import { GetMealsByUserId } from "@domain/services/meals/get-meals-by-user-id";
import { UserUnauthorized } from "@domain/services/users/errors/user-unauthorized";

export class GetMealsByUserIdController {
  constructor(private getMealsByUserId: GetMealsByUserId) { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    let { sessionId } = request.cookies;
    if (!sessionId) return reply.status(401).send({ error: "Unauthorized" });

    try {
      const { meals } = await this.getMealsByUserId.execute({ sessionId });
      reply.status(200).send(meals);
    } catch (error) {
      if (error instanceof UserUnauthorized) {
        reply.status(401).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Internal Server Error." });
      }
    }
  }
}
