import express from "express";
import { promoController } from "./promocode.controller";

const promoRouter = express.Router();

promoRouter.post("/create-promo-code", promoController.createPromoController);
promoRouter.get("/", promoController.getPromoController);
promoRouter.put("/update-promo/:id", promoController.updatePromoController);
promoRouter.post("/delete-promo", promoController.deletePromoController);

export default promoRouter;
