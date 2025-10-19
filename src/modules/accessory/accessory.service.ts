import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Accessory, { IAccessory } from "./accessory.model";

const createAccessoryService = async (payload: IAccessory) => {
	const result = await Accessory.create(payload);
	return result;
};

const getAllAccessoryService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Accessory.find({}), query)
		.search(["name", "type"])
		.fields()
		.filter()
		.sort()
		.pagination();

	const data = await result.modelQuery;
	const meta = await result.countTotal();

	return {
		meta,
		data,
	};
};

const getSingleAccessoryService = async (id: string) => {
	const result = await Accessory.findById(id);
	return result;
};

const updateAccessoryService = async (id: string, payload: Record<string, unknown>) => {
	const result = await Accessory.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

	return result;
};

const deleteAccessoryService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await Accessory.deleteMany({ _id: { $in: ids } });
	return result;
};

export const accessoryService = {
	createAccessoryService,
	getAllAccessoryService,
	getSingleAccessoryService,
	updateAccessoryService,
	deleteAccessoryService,
};
