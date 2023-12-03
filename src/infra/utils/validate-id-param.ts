import { z } from "zod";

export function validateIdParam(id: string){
    const idSchema = z.string().uuid()

    const result = idSchema.safeParse(id).success

    return result
}