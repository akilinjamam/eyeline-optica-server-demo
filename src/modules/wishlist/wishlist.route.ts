import express from "express";
import { wishlistController } from "./wishlist.controller";

const wishlistRouter = express.Router();

wishlistRouter.post("/create-wishlist", wishlistController.createWishlistController);
wishlistRouter.get("/get-wishlist", wishlistController.getWishlistAccordingToTypeController);

export default wishlistRouter;
