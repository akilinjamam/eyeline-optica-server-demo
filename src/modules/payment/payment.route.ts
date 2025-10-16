import express from "express";
import { paymentController } from "./payment.controller";

const paymentRouter = express.Router();

paymentRouter.post("/ssl-init", paymentController.createPaymentController);
paymentRouter.post("/payment-success", paymentController.paymentSuccessController);

export default paymentRouter;
