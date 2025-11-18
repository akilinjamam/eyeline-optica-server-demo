import express from "express";
import { paymentAppointmentController } from "./paymentAppointment.controller";

const paymentAppointmentRouter = express.Router();

paymentAppointmentRouter.post(
	"/ssl-init-appointment",
	paymentAppointmentController.createPaymentAppointmentController
);
paymentAppointmentRouter.post(
	"/payment-success-appointment",
	paymentAppointmentController.successPaymentAppointmentController
);
paymentAppointmentRouter.post(
	"/payment-fail-appointment",
	paymentAppointmentController.failedPaymentAppointmentController
);
paymentAppointmentRouter.post(
	"/payment-cancelled-appointment",
	paymentAppointmentController.cancelledPaymentAppointmentController
);

export default paymentAppointmentRouter;
