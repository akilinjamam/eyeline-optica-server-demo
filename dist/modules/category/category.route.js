"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../app/middleware/auth");
const category_controller_1 = require("./category.controller");
const cateogoryRouter = express_1.default.Router();
cateogoryRouter.post("/create-category", auth_1.protect, category_controller_1.CategoryController.createCategoryController);
cateogoryRouter.get("/", auth_1.protect, category_controller_1.CategoryController.getAllContactLenseController);
cateogoryRouter.put("/update-category/:id", auth_1.protect, category_controller_1.CategoryController.updateCategoryController);
cateogoryRouter.delete("/delete-category", auth_1.protect, category_controller_1.CategoryController.deleteCategoryController);
cateogoryRouter.get("/get-category-by-id/:id", auth_1.protect, category_controller_1.CategoryController.getSingleCategoryController);
exports.default = cateogoryRouter;
//# sourceMappingURL=category.route.js.map