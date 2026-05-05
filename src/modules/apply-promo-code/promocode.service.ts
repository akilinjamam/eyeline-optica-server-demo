import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Promo, { IPromo } from "./promocode.model";
import { AppError } from "../../app/errors/AppError";

const createPromoService = async (payload: IPromo) => {
	const result = await Promo.create(payload);
	return result;
};

const getPromoService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Promo.find(), query)
		.search(["category"])
		.filter()
		.fields()
		.sort()
		.pagination();

	const data = await result.modelQuery;
	const meta = await result.countTotal();

	return {
		data,
		meta,
	};
};

const updatePromoService = async (payload: IPromo, id: string) => {
	const result = await Promo.updateOne({ _id: id }, { $set: payload }, { runValidators: true });
	return result;
};

const deletePromoService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await Promo.deleteMany({ _id: { $in: ids } });
	return result;
};

export const promoService = {
	createPromoService,
	getPromoService,
	updatePromoService,
	deletePromoService,
};
