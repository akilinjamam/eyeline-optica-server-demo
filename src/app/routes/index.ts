import express from "express";
import productrouter from "../../modules/products/products.route";
const router = express.Router();

const allRoutes = [
	{
		path: "/products",
		route: productrouter,
	},
];

allRoutes.forEach((route) => router.use(route.path, route.route as any));

export default router;
