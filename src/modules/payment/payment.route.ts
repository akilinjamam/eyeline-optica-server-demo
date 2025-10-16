import express from "express";
import { paymentController } from "./payment.controller";

const paymentRouter = express.Router();

paymentRouter.post("/ssl-init", paymentController.createPaymentController);
paymentRouter.post("/payment-success", paymentController.paymentSuccessController);
paymentRouter.post("/payment-fail", paymentController.paymentFailController);
paymentRouter.post("/payment-cancelled", paymentController.paymentCancelledController);

export default paymentRouter;
