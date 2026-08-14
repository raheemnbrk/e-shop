import {
  addAddressSchema,
  updateAddressSchema,
} from "@/lib/validators/addressSchema";
import z from "zod";

export interface Address {
  id: string;
  label?: string | null;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

export type addAddressInput = z.infer<typeof addAddressSchema>;

export type updateAddressInput = z.infer<typeof updateAddressSchema>;
