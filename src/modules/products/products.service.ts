import Product from "./products.model";
import { IProduct } from "./products.types";

const createProductService = async (payload: IProduct) => {
	const result = await Product.create(payload);
	return result;
};

export const productService = {
	createProductService,
};
