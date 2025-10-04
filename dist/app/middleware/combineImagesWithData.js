"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const deleteFile_1 = require("../utils/deleteFile");
const combineImagesWithTextData = async (req, res, next) => {
    const files = req.files;
    try {
        const textData = JSON.parse(req.body.data);
        const { images: oldImageUrls, ...remainingTextData } = textData;
        console.log(textData);
        // Upload new images to Cloudinary
        const newImageUrls = [];
        for (const file of files) {
            const result = await cloudinary_1.default.uploader.upload(file.path, {
                folder: "products",
            });
            newImageUrls.push(result.secure_url);
            (0, deleteFile_1.deleteFile)(file.path); // remove from local storage after upload
        }
        let finalImages = newImageUrls;
        if (req.method === "PUT") {
            const oldImages = oldImageUrls || [];
            finalImages = [...oldImages, ...newImageUrls];
        }
        req.body = { ...remainingTextData, images: finalImages };
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
exports.default = combineImagesWithTextData;
//# sourceMappingURL=combineImagesWithData.js.map