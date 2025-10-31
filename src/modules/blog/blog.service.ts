import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import { AppError } from "../../app/errors/AppError";
import { Blog, IBlog } from "./blog.model";

const createBlogService = async (payload: IBlog) => {
	const result = await Blog.create(payload);
	return result;
};

const getAllBlogService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Blog.find({}), query)
		.search(["title", "category", "description"])
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

const getSingleBlogService = async (id: string) => {
	const result = await Blog.findOne({ _id: id });
	return result;
};

const updateBlogService = async (payload: Record<string, unknown>, id: string) => {
	const result = await Blog.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
	}
	return result;
};

const deleteBlogService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await Blog.deleteMany({ _id: { $in: ids } });
	return result;
};

export const BlogService = {
	createBlogService,
	getAllBlogService,
	getSingleBlogService,
	updateBlogService,
	deleteBlogService,
};
