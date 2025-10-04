"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const deleteFile_1 = require("../utils/deleteFile");
const oldCombineImagesWithTextData = async (req, res, next) => {
    try {
        const files = req.files;
        const textData = JSON.parse(req.body.data);
        const imageUrls = [];
        for (const file of files) {
            const result = await cloudinary_1.default.uploader.upload(file.path, {
                folder: "products",
            });
            imageUrls.push(result.secure_url);
            (0, deleteFile_1.deleteFile)(file.path);
        }
        req.body = { images: imageUrls, ...textData };
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "data processing error",
            error: error,
        });
    }
};
exports.default = oldCombineImagesWithTextData;
//# sourceMappingURL=oldCombineImagesWithData.js.map