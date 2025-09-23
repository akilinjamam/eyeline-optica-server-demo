import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Product from "./products.model";
import { IProduct } from "./products.types";
import { AppError } from "../../app/errors/AppError";

const createProductService = async (payload: IProduct) => {
	const result = await Product.create(payload);
	return result;
};

const getAllProductsService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Product.find({}), query)
		.search(["name", "type"])
		.filter()
		.fields()
		.sort()
		.pagination();

	const data = await result.modelQuery;
	const meta = await result.countTotal();

	return {
		meta,
		data,
	};
};

const updateProductService = async (payload: Record<string, unknown>, id: string) => {
	const result = await Product.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
	}

	return result;
};

const deleteProductService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await Product.deleteMany({ _id: { $in: ids } });
	return result;
};

export const productService = {
	createProductService,
	getAllProductsService,
	updateProductService,
	deleteProductService,
};
