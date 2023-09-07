"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const saveImageToCloudinary = async (req, res, next) => {
    try {
        const img = req.body.image;
        const uploadImg = await cloudinary_1.default.v2.uploader.upload(img, {
            folder: "Mem",
            resource_type: "image",
        });
        req.body.image = uploadImg.secure_url;
    }
    catch (error) {
        throw new Error("upload img problem");
    }
    next();
};
exports.default = saveImageToCloudinary;
