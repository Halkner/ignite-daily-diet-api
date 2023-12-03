import { FastifyReply, FastifyRequest } from "fastify";
import { UserUnauthorized } from "@domain/services/users/errors/user-unauthorized";
import { GetMealsSummary } from "@domain/services/meals/get-meals-summary";

export class GetMealsSummaryController {
    constructor(private getMealsSummary: GetMealsSummary) { }

    async handle(request: FastifyRequest, reply: FastifyReply) {
        let { sessionId } = request.cookies;
        if (!sessionId) return reply.status(401).send({ error: "Unauthorized" });

        try {
            const { summary } = await this.getMealsSummary.execute({ sessionId });
            reply.status(200).send(summary);
        } catch (error) {
            if (error instanceof UserUnauthorized) {
                reply.status(401).send({ error: error.message });
            } else {
                reply.status(500).send({ error: "Internal Server Error." });
            }
        }
    }
}
