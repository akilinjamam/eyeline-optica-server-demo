import express from "express";
import productrouter from "../../modules/products/products.route";
import lenserouter from "../../modules/lenses/lenses.route";
import cartRouter from "../../modules/cart/cart.route";
import contactlensRouter from "../../modules/contactLens/contactlens.route";
import registrationRouter from "../../modules/registration/registration.route";
import doctorRouter from "../../modules/doctor/doctor.route";
import scheduleRoute from "../../modules/schedule/schedule.route";
import prescriptionRouter from "../../modules/prescription/prescription.route";
import customerLoginRoute from "../../modules/customerLogin/customerLogin.route";
import paymentRouter from "../../modules/payment/payment.route";
import accessoryRouter from "../../modules/accessory/accessory.route";
import searchRouter from "../../modules/searchFilter/searchFilter.route";
import paymentHistoryRouter from "../../modules/paymentHistory/paymentHistory.route";
const router = express.Router();

const allRoutes = [
	{
		path: "/products",
		route: productrouter,
	},
	{
		path: "/lens",
		route: lenserouter,
	},
	{
		path: "/cart",
		route: cartRouter,
	},
	{
		path: "/contact-lens",
		route: contactlensRouter,
	},
	{
		path: "/registration",
		route: registrationRouter,
	},
	{
		path: "/doctors",
		route: doctorRouter,
	},
	{
		path: "/schedule",
		route: scheduleRoute,
	},
	{
		path: "/prescription",
		route: prescriptionRouter,
	},
	{
		path: "/login",
		route: customerLoginRoute,
	},
	{
		path: "/ssl",
		route: paymentRouter,
	},
	{
		path: "/accessory",
		route: accessoryRouter,
	},
	{
		path: "/search",
		route: searchRouter,
	},
	{
		path: "/payment-history",
		route: paymentHistoryRouter,
	},
];

allRoutes.forEach((route) => router.use(route.path, route.route as any));

export default router;
