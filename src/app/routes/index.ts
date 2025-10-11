import express from "express";
import productrouter from "../../modules/products/products.route";
import lenserouter from "../../modules/lenses/lenses.route";
import salesRouter from "../../modules/sales/sales.route";
import cartRouter from "../../modules/cart/cart.route";
import contactlensRouter from "../../modules/contactLens/contactlens.route";
import registrationRouter from "../../modules/registration/registration.route";
import doctorRouter from "../../modules/doctor/doctor.route";
import scheduleRoute from "../../modules/schedule/schedule.route";
import prescriptionRouter from "../../modules/prescription/prescription.route";
import customerLoginRoute from "../../modules/customerLogin/customerLogin.route";
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
		path: "/sales",
		route: salesRouter,
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
];

allRoutes.forEach((route) => router.use(route.path, route.route as any));

export default router;
