"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAddressAsDefaultService = exports.deleteUserService = exports.deleteAddress = exports.updateAddressService = exports.updateProfileService = exports.addAddressService = exports.getAllAddressesService = exports.getMeService = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const uploadImage_1 = require("../../shared/utils/uploadImage");
const getMeService = async (id) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id },
        omit: { password: true },
        include: {
            Seller: {
                select: {
                    storeName: true,
                    storeSlug: true,
                    description: true,
                    logo: true,
                    status: true,
                },
            },
        },
    });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    return { user };
};
exports.getMeService = getMeService;
const getAllAddressesService = async (userId) => {
    const addresses = await prisma_1.default.address.findMany({
        where: { userId },
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
    return addresses;
};
exports.getAllAddressesService = getAllAddressesService;
const addAddressService = async (userId, input) => {
    if (input.isDefault) {
        await prisma_1.default.address.updateMany({
            where: { userId },
            data: { isDefault: false },
        });
    }
    const address = await prisma_1.default.address.create({ data: { ...input, userId } });
    return address;
};
exports.addAddressService = addAddressService;
const updateProfileService = async (id, input, file) => {
    let user = await prisma_1.default.user.findUnique({
        where: { id },
        omit: { password: true },
    });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    const { firstName, lastName, phoneNumber, removeImage } = input;
    let imageURl;
    if (file) {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        imageURl = await (0, uploadImage_1.uploadImage)(base64, "e-shop/users");
    }
    else if (removeImage) {
        imageURl = null;
    }
    user = await prisma_1.default.user.update({
        where: { id },
        data: {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(phoneNumber && { phoneNumber }),
            ...(imageURl !== undefined && { image: imageURl }),
        },
    });
    return { user };
};
exports.updateProfileService = updateProfileService;
const updateAddressService = async (userId, addressId, input) => {
    const address = await prisma_1.default.address.findFirst({
        where: { id: addressId, userId },
    });
    if (!address)
        throw new apiError_1.ApiError(404, "Address not found.");
    if (input.isDefault) {
        await prisma_1.default.address.updateMany({
            where: { userId, isDefault: true },
            data: { isDefault: false },
        });
    }
    return await prisma_1.default.address.update({
        where: { id: addressId },
        data: input,
    });
};
exports.updateAddressService = updateAddressService;
const deleteAddress = async (userId, addressId) => {
    const address = await prisma_1.default.address.findFirst({
        where: { id: addressId, userId },
    });
    if (!address)
        throw new apiError_1.ApiError(404, "Address not found.");
    await prisma_1.default.address.delete({ where: { id: addressId, userId } });
    return { message: "Address deleted successfully." };
};
exports.deleteAddress = deleteAddress;
const deleteUserService = async (userId) => {
    const user = await prisma_1.default.user.delete({ where: { id: userId } });
    if (!user)
        throw new apiError_1.ApiError(404, "User not found.");
    return { message: "Account is successfully deleted." };
};
exports.deleteUserService = deleteUserService;
const setAddressAsDefaultService = async (userId, addressId) => {
    const address = await prisma_1.default.address.findFirst({
        where: { id: addressId, userId },
    });
    if (!address)
        throw new apiError_1.ApiError(404, "Address not found.");
    await prisma_1.default.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
    });
    await prisma_1.default.address.update({
        where: { id: addressId, userId },
        data: { isDefault: true },
    });
    return { message: "Address marked as default." };
};
exports.setAddressAsDefaultService = setAddressAsDefaultService;
