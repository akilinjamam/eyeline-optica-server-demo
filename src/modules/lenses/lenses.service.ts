import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import { Lens } from "./lenses.model";
import { ILens } from "./lenses.types";
import mongoose from "mongoose";
import cloudinary from "../../app/config/cloudinary";
import { processPublicIds } from "../../app/utils/processPubliceId";

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

const getSingleLensService = async (id: string) => {
	const result = await Lens.findOne({ _id: id });
	return result;
};

const updateLensService = async (payload: any, id: string) => {
	const publicIds = processPublicIds(payload?.imageIds);

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const result = await Lens.findByIdAndUpdate(id, payload, {
			new: true,
			runValidators: true,
			session,
		});

		if (!result) {
			throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
		}

		const delatableIds = (publicIds as string[]) || [];

		if (delatableIds.length > 0) {
			for (const imgId of delatableIds) {
				await cloudinary.uploader.destroy(imgId);
			}
		}

		await session.commitTransaction();
		session.endSession();

		return result;
	} catch (error: any) {
		console.log(error);
		await session.abortTransaction();
		session.endSession();
	}
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
	getSingleLensService,
};
