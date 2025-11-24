"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("./wishlist.controller");
const wishlistRouter = express_1.default.Router();
wishlistRouter.post("/create-wishlist", wishlist_controller_1.wishlistController.createWishlistController);
wishlistRouter.post("/get-wishlist", wishlist_controller_1.wishlistController.getWishlistAccordingToTypeController);
exports.default = wishlistRouter;
//# sourceMappingURL=wishlist.route.js.map