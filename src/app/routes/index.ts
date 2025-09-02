import express from "express";
import productrouter from "../../modules/products/products.route";
import lenserouter from "../../modules/lenses/lenses.route";
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
];

allRoutes.forEach((route) => router.use(route.path, route.route as any));

export default router;
