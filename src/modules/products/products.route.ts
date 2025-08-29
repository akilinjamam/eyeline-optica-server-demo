import express from "express";
import { upload } from "../../app/middleware/multer";
import { productController } from "./products.controller";

const productrouter = express.Router();

productrouter.post(
	"/create-product",
	upload.array("images", 10),
	productController.createProductController
);

export default productrouter;
