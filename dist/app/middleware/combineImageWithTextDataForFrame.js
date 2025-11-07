"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const deleteFileAsync_1 = require("../utils/deleteFileAsync");
const combineImagesWithTextDataForFrame = async (req, res, next) => {
    const files = req.files;
    try {
        const textData = JSON.parse(req.body.data);
        const { otherImages: oldOtherImages, ...remainingTextData } = textData;
        // Group uploaded files by fieldname
        const filesByField = {};
        for (const file of files) {
            const key = file?.fieldname;
            if (!file?.fieldname)
                continue;
            if (!filesByField[key])
                filesByField[key] = [];
            filesByField[key].push(file);
        }
        const uploadedOtherImages = [];
        if (Array.isArray(textData.otherImages)) {
            for (let i = 0; i < textData.otherImages.length; i++) {
                const group = textData.otherImages[i];
                const groupField = `otherImages_${i}`;
                const groupFiles = filesByField[groupField] || [];
                // ✅ Upload files for this group in parallel
                const uploadedUrls = await Promise.all(groupFiles.map(async (file) => {
                    try {
                        const result = await cloudinary_1.default.uploader.upload(file.path, {
                            folder: "products/variants",
                        });
                        return result.secure_url;
                    }
                    catch (err) {
                        console.error(`Upload failed for ${file.path}:`, err);
                        return null;
                    }
                    finally {
                        await (0, deleteFileAsync_1.deleteFileAsync)(file.path);
                    }
                })).then((urls) => urls.filter(Boolean)); // remove nulls
                let finalGroupImages = [];
                if (req.method === "PUT") {
                    const oldGroup = oldOtherImages?.find((g) => g._id?.toString() === group?._id);
                    const remainingOldImages = Array.isArray(group?.imagesToKeep)
                        ? group.imagesToKeep
                        : oldGroup?.images || [];
                    finalGroupImages = [...remainingOldImages, ...uploadedUrls];
                }
                else {
                    finalGroupImages = uploadedUrls;
                }
                uploadedOtherImages.push({
                    _id: group?._id,
                    colorName: group?.colorName,
                    fromColor: group?.fromColor,
                    toColor: group?.toColor,
                    images: finalGroupImages,
                });
            }
        }
        req.body = {
            ...remainingTextData,
            otherImages: uploadedOtherImages,
        };
        next();
    }
    catch (error) {
        if (files?.length) {
            await Promise.all(files.map((f) => (0, deleteFileAsync_1.deleteFileAsync)(f.path)));
        }
        return res.status(400).json({
            success: false,
            message: "Data processing error",
            error,
        });
    }
};
exports.default = combineImagesWithTextDataForFrame;
//# sourceMappingURL=combineImageWithTextDataForFrame.js.map