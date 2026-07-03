import z from "zod";
import {
  addAddressSchema,
  updateAddressSchema,
  updateProfileSchema,
} from "../validations/userValidations";

export type updateProfileInput = z.infer<typeof updateProfileSchema>;

export type addAddressInput = z.infer<typeof addAddressSchema>;

export type updateAddressInput = z.infer<typeof updateAddressSchema>;
