"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const index_1 = __importDefault(require("./index"));
if (!index_1.default.cloude_name || !index_1.default.api_key || !index_1.default.api_secret) {
    throw new Error("Cloudinary configuration values are missing");
}
cloudinary_1.v2.config({
    cloud_name: index_1.default.cloude_name,
    api_key: index_1.default.api_key,
    api_secret: index_1.default.api_secret,
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map