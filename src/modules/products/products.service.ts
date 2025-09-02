import QueryBuilder from "../../app/middleware/QueryBuilder";
import Product from "./products.model";
import { IProduct } from "./products.types";

const createProductService = async (payload: IProduct) => {
	const result = await Product.create(payload);
	return result;
};

const getAllProductsService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Product.find({}), query)
		.search(["name", "type"])
		.filter()
		.fields()
		.pagination();

	const data = await result.modelQuery;
	const meta = await result.countTotal();

	return {
		meta,
		data,
	};
};

export const productService = {
	createProductService,
	getAllProductsService,
};
