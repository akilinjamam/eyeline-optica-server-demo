import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Meta, { IMeta } from "./metadata.model";
import { AppError } from "../../app/errors/AppError";

const createMetaService = async (payload: IMeta) => {
	const result = await Meta.create(payload);
	return result;
};

const getAllMetaService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Meta.find({}), query)
		.search(["title", "description", "routeName"])
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

const getSingleMetaService = async (id: string) => {
	const result = await Meta.findOne({ _id: id });
	return result;
};

const updateMetaService = async (payload: Record<string, unknown>, id: string) => {
	const result = await Meta.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Meta not found");
	}

	return result;
};

const deleteMetaService = async (id: String) => {
	if (!id) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await Meta.deleteOne({ _id: id });
	return result;
};

export const metaService = {
	createMetaService,
	getAllMetaService,
	updateMetaService,
	deleteMetaService,
	getSingleMetaService,
};
