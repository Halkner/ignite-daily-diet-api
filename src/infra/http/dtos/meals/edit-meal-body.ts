import { z } from "zod";

export const editMealBodySchema = z.object({
    name: z.string({
        invalid_type_error: "name must be a string."
    }).optional(),
    description: z.string({
        invalid_type_error: "description must be a string."
    }).optional(),
    datetime: z.string({
        invalid_type_error: "datetime must be a string."
    }).optional(),
    isDietMeal: z.boolean({
        invalid_type_error: "isDietMeal must be a boolean."
    }).optional(),
})

export type EditMealBody = z.infer<typeof editMealBodySchema>