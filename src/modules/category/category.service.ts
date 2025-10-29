import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";

import { AppError } from "../../app/errors/AppError";
import { Category, ICategory } from "./category.model";

const createCategoryService = async (payload: ICategory) => {
	const result = await Category.create(payload);

	return result;
};

const getAllCategoryService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Category.find({}), query)
		.search(["categoryType", "category"])
		.filter()
		.fields()
		.sort()
		.pagination();

	const meta = await result.countTotal();
	const data = await result.modelQuery;

	return {
		meta,
		data,
	};
};

const getSingleCategoryService = async (id: string) => {
	const result = await Category.findOne({ _id: id });
	return result;
};

const updateCategoryService = async (payload: Record<string, unknown>, id: string) => {
	const result = await Category.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
	}

	return result;
};

const deleteCategoryService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await Category.deleteMany({ _id: { $in: ids } });
	return result;
};

export const CategoryService = {
	createCategoryService,
	getAllCategoryService,
	getSingleCategoryService,
	updateCategoryService,
	deleteCategoryService,
};
