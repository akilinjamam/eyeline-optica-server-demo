/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Product from "./products.model";
import { IProduct } from "./products.types";
import { AppError } from "../../app/errors/AppError";
import { slugify } from "../../app/utils/slugify";
import { allowedQueryKeys } from "../../app/utils/allowedqueryKeys";
import { deleteFromR2 } from "../../app/config/r2.service";

const createProductService = async (payload: IProduct) => {
	const slugifiedData = await slugify(payload, Product, "name");
	const result = await Product.create(slugifiedData);
	return result;
};

const getAllProductsService = async (query: Record<string, unknown>) => {
	const filteredQuery = allowedQueryKeys(
		[
			"biologyCategory",
			"shapeCategory",
			"materialsCategory",
			"frameCategory",
			"sizeCategory",
			"color",
			"page",
			"limit",
			"sort",
			"searchTerm",
			"brand",
			"type",
		],
		query
	);
	const result = new QueryBuilder(Product.find({}), filteredQuery)
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

const getSingleProductService = async (slug: string) => {
	const result = await Product.findOne({ slug: slug });
	return result;
};

const updateProductService = async (payload: Record<string, unknown>, id: string) => {
	const checkQuantity = payload.quantity;

	const { stock, ...remaining } = payload;

	let updatedStock = true;
	if ((checkQuantity as number) > 0) {
		updatedStock = true;
	} else {
		updatedStock = false;
	}

	const result = await Product.findByIdAndUpdate(
		id,
		{ ...remaining, stock: updatedStock },
		{
			new: true,
			runValidators: true,
		}
	);

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
	}

	return result;
};

const deleteProductService = async (ids: string[]) => {
	const imageUrls: string[] = [];
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}
	const products = await Product.find({ _id: { $in: ids } });

	products.forEach((product) => {
		product.otherImages?.forEach((variant) => {
			if (variant.images.length) {
				imageUrls.push(...variant.images);
			}
		});
	});

	await Promise.all(imageUrls?.map((url) => deleteFromR2(url)));

	const result = await Product.deleteMany({ _id: { $in: ids } });

	return result;
};

export const productService = {
	createProductService,
	getAllProductsService,
	updateProductService,
	deleteProductService,
	getSingleProductService,
};
