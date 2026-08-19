import z from "zod"
import { userQuerySchema } from "../validations/adminValidation"

export type userQueryInput = z.infer<typeof userQuerySchema >