import express from "express";
import { paymentHistoryController } from "./paymentHistory.controller";

const paymentHistoryRouter = express.Router();

paymentHistoryRouter.get(
	"/get-payment-history/:cus_id",
	paymentHistoryController.getPaymentHistoryController
);
paymentHistoryRouter.get(
	"/get-single-payment-history/:id",
	paymentHistoryController.getSinglePaymentHistoryController
);

export default paymentHistoryRouter;
