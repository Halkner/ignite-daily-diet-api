import { z } from "zod";

export const createUserBodySchema = z.object({
    username: z.string({
        required_error: "username is required.",
        invalid_type_error: "username must be a string"
    }),
    email: z.string({
        required_error: "email is required.",
        invalid_type_error: "email must be a string"
    }).email({message: "email is not valid"}),
    password: z.string({
        required_error: "password is required.",
        invalid_type_error: "password must be a string"
    }).min(8,{message: "password must have at least 8 characters"})
}).required({})

export type CreateUserBody = z.infer<typeof createUserBodySchema>