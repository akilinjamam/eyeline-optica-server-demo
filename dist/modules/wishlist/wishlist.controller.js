"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const wishlist_service_1 = require("./wishlist.service");
const createWishlistController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await wishlist_service_1.wwishListService.createWishListService(req?.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "successfully done",
        data: result,
    });
});
exports.wishlistController = {
    createWishlistController,
};
//# sourceMappingURL=wishlist.controller.js.map