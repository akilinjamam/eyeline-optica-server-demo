import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Accessory, { IAccessory } from "./accessory.model";
import { slugify } from "../../app/utils/slugify";

const createAccessoryService = async (payload: IAccessory) => {
	const slugifiedData = await slugify(payload, Accessory, "slug");
	const result = await Accessory.create(slugifiedData);
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

const getSingleAccessoryService = async (slug: string) => {
	const result = await Accessory.findOne({ slug: slug });
	return result;
};

const updateAccessoryService = async (id: string, payload: any) => {
	const result = await Accessory.findByIdAndUpdate(
		id,
		{
			type: payload.data.type,
			images: payload.images || [],
			slug: payload.data.slug,
			items: payload.data.items,
		},
		{ new: true }
	);

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
	}

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
