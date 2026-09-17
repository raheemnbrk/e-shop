"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const uploadImage = async (file, folder) => {
    const result = await cloudinary_1.default.uploader.upload(file, { folder });
    return result.secure_url;
};
exports.uploadImage = uploadImage;
