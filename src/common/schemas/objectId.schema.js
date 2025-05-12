import { z } from "zod";

export const objectIdSchema = {
  params: z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Debe ser tipo ObjectId")
  })
}