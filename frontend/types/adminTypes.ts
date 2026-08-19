import { userQuerySchema } from "@/lib/validators/adminSchema";
import z from "zod";
import { User } from "./authTypes";

export type userQueryInput = z.infer<typeof userQuerySchema>;

export interface allUserResponse {
  users: User[];
  pagination: Pagination;
}
