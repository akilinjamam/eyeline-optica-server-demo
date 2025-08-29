import { IProduct } from "./products.types";

const createProductService = async (payload: IProduct) => {
	const { ...all } = payload;
	return all;
};

export const productService = {
	createProductService,
};
