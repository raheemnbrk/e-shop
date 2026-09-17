"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.addAddressSchema = exports.updateProfileSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateProfileSchema = zod_1.default.object({
    firstName: zod_1.default
        .string()
        .min(3, "first name must be at least 3 characters.")
        .optional(),
    lastName: zod_1.default
        .string()
        .min(3, "last name must be at least 3 characters.")
        .optional(),
    phoneNumber: zod_1.default
        .string()
        .regex(/^(05|06|07)\d{8}$/, "Phone number must be a valid Algerian mobile number")
        .length(10, "phone number must contains 10 digits.")
        .optional(),
    removeImage: zod_1.default.coerce.boolean().optional(),
});
exports.addAddressSchema = zod_1.default.object({
    label: zod_1.default.string().optional(),
    street: zod_1.default.string().min(1, "street is required."),
    city: zod_1.default.string().min(1, "City is required."),
    state: zod_1.default.string().min(1, "State is required."),
    country: zod_1.default.string().min(1, "Country is required."),
    zipCode: zod_1.default
        .string()
        .min(1, "Zip code code is required.")
        .regex(/^\d+$/, "Zip code must contain only digits")
        .length(5, "Zip code must contain 5 digits"),
    isDefault: zod_1.default.boolean().optional().default(false),
});
exports.updateAddressSchema = zod_1.default.object({
    label: zod_1.default.string().optional(),
    street: zod_1.default.string().optional(),
    city: zod_1.default.string().optional(),
    state: zod_1.default.string().optional(),
    country: zod_1.default.string().optional(),
    zipCode: zod_1.default
        .string()
        .regex(/^\d+$/, "Zip code must contain only digits")
        .length(5, "Zip code must contain 5 digits")
        .optional(),
    isDefault: zod_1.default.boolean().optional().default(false),
});
