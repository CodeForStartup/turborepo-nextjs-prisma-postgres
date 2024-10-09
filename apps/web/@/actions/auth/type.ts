import { z } from "zod"

export const signUpSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})

export type SignUpDataInput = z.infer<typeof signUpSchema>

export type SignUpDataOutput = z.inferFlattenedErrors<typeof signUpSchema>
