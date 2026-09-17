"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAddressAsDefaultController = exports.deleteUserController = exports.deleteAddressController = exports.updateAddressController = exports.updateProfileController = exports.addAddressController = exports.getAllAddressesController = exports.getMeController = void 0;
const userServices = __importStar(require("./userServices"));
const userValidations_1 = require("../../shared/validations/userValidations");
const getMeController = async (req, res, next) => {
    try {
        const id = req.user.id;
        const { user } = await userServices.getMeService(id);
        return res.json({ success: true, user });
    }
    catch (err) {
        next(err);
    }
};
exports.getMeController = getMeController;
const getAllAddressesController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const addresses = await userServices.getAllAddressesService(userId);
        return res.status(200).json({ success: true, addresses });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllAddressesController = getAllAddressesController;
const addAddressController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const input = userValidations_1.addAddressSchema.parse(req.body);
        const address = await userServices.addAddressService(userId, input);
        return res.status(200).json({ success: true, address });
    }
    catch (err) {
        next(err);
    }
};
exports.addAddressController = addAddressController;
const updateProfileController = async (req, res, next) => {
    try {
        const id = req.user.id;
        const input = userValidations_1.updateProfileSchema.parse(req.body);
        const file = req.file;
        const result = await userServices.updateProfileService(id, input, file);
        return res.json({ success: true, user: result.user });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProfileController = updateProfileController;
const updateAddressController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const input = userValidations_1.updateAddressSchema.parse(req.body);
        const addressId = req.params.id;
        const address = await userServices.updateAddressService(userId, addressId, input);
        return res.status(200).json({ success: true, address });
    }
    catch (err) {
        next(err);
    }
};
exports.updateAddressController = updateAddressController;
const deleteAddressController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        const { message } = await userServices.deleteAddress(userId, addressId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAddressController = deleteAddressController;
const deleteUserController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { message } = await userServices.deleteUserService(userId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUserController = deleteUserController;
const setAddressAsDefaultController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        const { message } = await userServices.setAddressAsDefaultService(userId, addressId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.setAddressAsDefaultController = setAddressAsDefaultController;
