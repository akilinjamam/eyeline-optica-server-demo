"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileAsync = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const deleteFileAsync = async (filePath) => {
    if (!filePath)
        return;
    try {
        await promises_1.default.unlink(filePath);
        console.log(`temporary file deleted: ${filePath}`);
    }
    catch (error) {
        if (error.code === "ENOENT") {
            console.log(`file already deleted ${filePath}`);
        }
        else {
            console.log(`failed to delete file: ${filePath}`, error);
        }
    }
};
exports.deleteFileAsync = deleteFileAsync;
//# sourceMappingURL=deleteFileAsync.js.map