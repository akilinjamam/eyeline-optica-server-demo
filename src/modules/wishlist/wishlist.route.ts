import express from "express";
import { wishlistController } from "./wishlist.controller";

const wishlistRouter = express.Router();

wishlistRouter.post("/create-wishlist", wishlistController.createWishlistController);

export default wishlistRouter;
