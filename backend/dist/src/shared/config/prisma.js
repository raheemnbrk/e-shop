"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../../generated/prisma/client");
const adapter_neon_1 = require("@prisma/adapter-neon");
const globalForPrisma = globalThis;
const adapter = new adapter_neon_1.PrismaNeon({ connectionString: process.env.DATABASE_URL });
exports.prisma = globalForPrisma.prisma ?? new client_1.PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
exports.default = exports.prisma;
