import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import { Lens } from "./lenses.model";
import { ILens } from "./lenses.types";

const createLenseService = async (payload: ILens) => {
	const result = await Lens.create(payload);
	return result;
};

const getAllLenseService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Lens.find({}), query)
		.search(["name", "description"])
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

const updateLensService = async (payload: Record<string, unknown>, id: string) => {
	const result = await Lens.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
	}

	return result;
};

const deleteLensService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await Lens.deleteMany({ _id: { $in: ids } });
	return result;
};

export const lenseService = {
	createLenseService,
	getAllLenseService,
	updateLensService,
	deleteLensService,
};
