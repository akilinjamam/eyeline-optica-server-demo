import express from "express";
import { protect } from "../../app/middleware/auth";
import { CategoryController } from "./category.controller";

const cateogoryRouter = express.Router();

cateogoryRouter.post("/create-category", protect, CategoryController.createCategoryController);

cateogoryRouter.get("/", protect, CategoryController.getAllContactLenseController);
cateogoryRouter.put("/update-category/:id", protect, CategoryController.updateCategoryController);
cateogoryRouter.delete("/delete-category", protect, CategoryController.deleteCategoryController);
cateogoryRouter.get(
	"/get-category-by-id/:id",
	protect,
	CategoryController.getSingleCategoryController
);

export default cateogoryRouter;
