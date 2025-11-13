"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../app/middleware/multer");
const combineImagesWithData_1 = __importDefault(require("../../app/middleware/combineImagesWithData"));
const auth_1 = require("../../app/middleware/auth");
const banner_controller_1 = require("./banner.controller");
const banner_validation_1 = require("./banner.validation");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const bannerRoute = express_1.default.Router();
bannerRoute.post("/create-banner", auth_1.protect, multer_1.upload.array("images", 10), combineImagesWithData_1.default, (0, validateRequest_1.default)(banner_validation_1.bannerSchema), banner_controller_1.BannerController.createBannerController);
bannerRoute.get("/", banner_controller_1.BannerController.getAllBannerController);
bannerRoute.put("/update-banner/:id", multer_1.upload.array("images", 10), combineImagesWithData_1.default, banner_controller_1.BannerController.updateBannerController);
bannerRoute.delete("/delete-banner", banner_controller_1.BannerController.deleteBannerController);
bannerRoute.get("/get-banner-by-id/:id", banner_controller_1.BannerController.getSingleBannerController);
exports.default = bannerRoute;
//# sourceMappingURL=banner.route.js.map