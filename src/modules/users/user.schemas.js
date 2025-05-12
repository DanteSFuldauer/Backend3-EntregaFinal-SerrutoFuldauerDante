import { z } from "zod";

export const userMocksSchema = {
  params: z.object({
    amount: z.coerce
      .number({ invalid_type_error: "El valor debe ser un número" })
      .int("Tiene que ser un número entero")
      .positive("El número tiene que ser positivo"),
  })
};

/* export const createUserSchema = {
  body: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional()
  })
} */

export const updateUserSchema = {
  params: z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "De ser tipo ObjectId")
  }),
  body: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional()
  })
}
