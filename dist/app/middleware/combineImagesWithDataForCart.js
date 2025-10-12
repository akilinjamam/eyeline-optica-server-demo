"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const deleteFile_1 = require("../utils/deleteFile");
const combineImagesWithTextDataForCart = async (req, res, next) => {
    const files = req.files;
    try {
        const textData = JSON.parse(req.body.data);
        // Upload new images to Cloudinary
        const newImageUrls = [];
        for (const file of files) {
            const result = await cloudinary_1.default.uploader.upload(file.path, {
                folder: "products",
            });
            newImageUrls.push(result.secure_url);
            (0, deleteFile_1.deleteFile)(file.path); // remove from local storage after upload
        }
        req.body = { ...textData, prescriptionImg: newImageUrls };
        next();
    }
    catch (error) {
        for (const file of files) {
            (0, deleteFile_1.deleteFile)(file.path); // remove from local storage after upload
        }
        return res.status(400).json({
            success: false,
            message: "data processing error",
            error,
        });
    }
};
exports.default = combineImagesWithTextDataForCart;
//# sourceMappingURL=combineImagesWithDataForCart.js.map