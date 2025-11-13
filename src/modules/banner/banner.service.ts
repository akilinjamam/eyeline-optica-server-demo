import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Banner, { IBanner } from "./banner.model";

const createBannerService = async (payload: IBanner) => {
	const result = await Banner.create(payload);
	return result;
};

const getAllBannerService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Banner.find({}), query)
		.search(["category"])
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

const getSingleBannerService = async (id: string) => {
	const result = await Banner.findOne({ _id: id });
	return result;
};

const updateBannerService = async (payload: Record<string, unknown>, id: string) => {
	const result = await Banner.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Banner not found");
	}

	return result;
};

const deleteBannerService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await Banner.deleteMany({ _id: { $in: ids } });
	return result;
};

export const BannerService = {
	createBannerService,
	getAllBannerService,
	updateBannerService,
	deleteBannerService,
	getSingleBannerService,
};
