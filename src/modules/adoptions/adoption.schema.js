import { z } from "zod";

export const createAdoptionSchema = {
  body: z.object({ //Debe ser un objeto
    owner: z.string().regex(/^[a-f\d]{24}$/i, { message: "Debe ser un ObjectId"}),
    pet: z.string().regex(/^[a-f\d]{24}$/i, { message: "Debe ser un ObjectId"})
  })
}
