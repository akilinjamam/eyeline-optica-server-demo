import express from "express";
import { upload } from "../../app/middleware/multer";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithData";
import { protect } from "../../app/middleware/auth";
import { BannerController } from "./banner.controller";
import { bannerSchema } from "./banner.validation";
import validateRequest from "../../app/middleware/validateRequest";

const bannerRoute = express.Router();

bannerRoute.post(
	"/create-banner",
	protect,
	upload.array("images", 10),
	combineImagesWithTextData,
	validateRequest(bannerSchema),
	BannerController.createBannerController
);

bannerRoute.get("/", BannerController.getAllBannerController);
bannerRoute.put(
	"/update-banner/:id",
	upload.array("images", 10),
	combineImagesWithTextData,
	BannerController.updateBannerController
);
bannerRoute.delete("/delete-banner", BannerController.deleteBannerController);
bannerRoute.get("/get-banner-by-id/:id", BannerController.getSingleBannerController);

export default bannerRoute;
