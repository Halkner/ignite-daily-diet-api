import { z } from "zod";

export const createMealBodySchema = z.object({
    name: z.string({
        required_error: "name is required.",
        invalid_type_error: "name must be a string."
    }),
    description: z.string({
        required_error: "description is required.",
        invalid_type_error: "description must be a string."
    }),
    datetime: z.string({
        required_error: "datetime is required.",
        invalid_type_error: "datetime must be a string."
    }),
    isDietMeal: z.boolean({
        required_error: "isDietMeal is required.",
        invalid_type_error: "isDietMeal must be a boolean."
    }),
}).required()

export type CreateMealBody = z.infer<typeof createMealBodySchema>