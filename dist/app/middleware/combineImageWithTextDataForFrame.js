"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const deleteFile_1 = require("../utils/deleteFile");
const combineImagesWithTextDataForFrame = async (req, res, next) => {
    const files = req.files;
    try {
        const textData = JSON.parse(req.body.data);
        const { otherImages: oldOtherImages, ...remainingTextData } = textData;
        // Group uploaded files by fieldname
        const filesByField = {};
        for (const file of files) {
            const key = file.fieldname;
            if (!filesByField[key])
                filesByField[key] = [];
            filesByField[key].push(file);
        }
        const uploadedOtherImages = [];
        if (Array.isArray(textData.otherImages)) {
            for (let i = 0; i < textData.otherImages.length; i++) {
                const group = textData.otherImages[i];
                const groupFiles = filesByField[`otherImages_${i}`] || [];
                const uploadedUrls = [];
                // Upload new files
                for (const file of groupFiles) {
                    const result = await cloudinary_1.default.uploader.upload(file.path, {
                        folder: "products/variants",
                    });
                    uploadedUrls.push(result.secure_url);
                    (0, deleteFile_1.deleteFile)(file.path);
                }
                // Merge or replace logic
                let finalGroupImages = [];
                if (req.method === "PUT") {
                    // Find old version of this group (if it exists)
                    const oldGroup = oldOtherImages?.find((g) => g._id?.toString() === group?._id);
                    // Get existing images (after possible deletions)
                    const remainingOldImages = Array.isArray(group?.imagesToKeep)
                        ? group?.imagesToKeep
                        : oldGroup?.images || [];
                    // Combine kept + new
                    finalGroupImages = [...remainingOldImages, ...uploadedUrls];
                }
                else {
                    finalGroupImages = uploadedUrls;
                }
                uploadedOtherImages.push({
                    colorName: group?.colorName,
                    fromColor: group?.fromColor,
                    toColor: group?.toColor,
                    images: finalGroupImages,
                });
            }
        }
        // ------------------------
        // Final result
        // ------------------------
        req.body = {
            ...remainingTextData,
            otherImages: uploadedOtherImages,
        };
        next();
    }
    catch (error) {
        if (files)
            files.forEach((file) => (0, deleteFile_1.deleteFile)(file.path));
        return res.status(400).json({
            success: false,
            message: "Data processing error",
            error,
        });
    }
};
exports.default = combineImagesWithTextDataForFrame;
//# sourceMappingURL=combineImageWithTextDataForFrame.js.map