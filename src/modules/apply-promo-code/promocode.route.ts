import express from "express";
import { promoController } from "./promocode.controller";
import { protectPromo } from "../../app/middleware/auth";

const promoRouter = express.Router();

promoRouter.post("/create-promo-code", promoController.createPromoController);
promoRouter.get("/", protectPromo, promoController.getPromoController);
promoRouter.post("/apply-promo", protectPromo, promoController.applyPromoController);
promoRouter.put("/update-promo/:id", promoController.updatePromoController);
promoRouter.post("/delete-promo", promoController.deletePromoController);

export default promoRouter;
