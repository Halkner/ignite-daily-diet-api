import { EditMeal } from "@domain/services/meals/edit-meal";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  EditMealBody,
  editMealBodySchema,
} from "@http/dtos/meals/edit-meal-body";
import { UserUnauthorized } from "@domain/services/users/errors/user-unauthorized";
import { MealNotFound } from "@domain/services/meals/errors/meal-not-found";

export class EditMealController {
  constructor(private editMeal: EditMeal) { }

  async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: EditMealBody }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { body } = request;
    let { sessionId } = request.cookies;

    const validatedData = editMealBodySchema.safeParse(request.body);

    if (!validatedData.success) {
      reply
        .status(400)
        .send(validatedData.error.issues.map((issue) => issue.message));
    }

    if (!sessionId) return reply.status(401).send({ error: "Unauthorized" });

    try {
      const { meal } = await this.editMeal.execute({ id, ...body, sessionId });
      reply.status(200).send(meal);
    } catch (error) {
      if (error instanceof UserUnauthorized) {
        reply.status(401).send({ error: error.message });
      } else if (error instanceof MealNotFound) {
        reply.status(404).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Internal Server Error." });
      }
    }
  }
}
