import express from "express";
import productrouter from "../../modules/products/products.route";
import lenserouter from "../../modules/lenses/lenses.route";
import salesRouter from "../../modules/sales/sales.route";
import cartRouter from "../../modules/cart/cart.route";
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
];

allRoutes.forEach((route) => router.use(route.path, route.route as any));

export default router;
