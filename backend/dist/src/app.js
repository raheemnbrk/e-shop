"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./features/auth/authRoutes"));
const errorHandler_1 = require("./shared/middlewares/errorHandler");
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("./shared/config/passport"));
const userRoutes_1 = __importDefault(require("./features/user/userRoutes"));
const sellerRouter_1 = __importDefault(require("./features/seller/sellerRouter"));
const adminRoutes_1 = __importDefault(require("./features/admin/adminRoutes"));
const productRoutes_1 = __importDefault(require("./features/products/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./features/category/categoryRoutes"));
const reviewRoutes_1 = __importDefault(require("./features/review/reviewRoutes"));
const cartRoutes_1 = __importDefault(require("./features/cart/cartRoutes"));
const orderRouter_1 = __importDefault(require("./features/order/orderRouter"));
const couponRoutes_1 = __importDefault(require("./features/coupon/couponRoutes"));
const orderController_1 = require("./features/order/orderController");
const statsRoutes_1 = __importDefault(require("./features/stats/statsRoutes"));
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.post("/api/webhooks/stripe", express_1.default.raw({
    type: "application/json",
}), orderController_1.stripeWebhookController);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use("/api/seller", sellerRouter_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/product", productRoutes_1.default);
app.use("/api/category", categoryRoutes_1.default);
app.use("/api/review", reviewRoutes_1.default);
app.use("/api/cart", cartRoutes_1.default);
app.use("/api/orders", orderRouter_1.default);
app.use("/api/coupon", couponRoutes_1.default);
app.use("/api/stats", statsRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
