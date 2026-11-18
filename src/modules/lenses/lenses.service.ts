import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import { Lens } from "./lenses.model";
import { ILens } from "./lenses.types";
import mongoose from "mongoose";
import { slugify } from "../../app/utils/slugify";
import { allowedQueryKeys } from "../../app/utils/allowedqueryKeys";
import { deleteFromR2 } from "../../app/config/r2.service";

const createLenseService = async (payload: ILens) => {
	const slugifiedData = await slugify(payload, Lens, "name");
	const result = await Lens.create(slugifiedData);
	return result;
};

const getAllLenseService = async (query: Record<string, unknown>) => {
	const filteredQueryKey = allowedQueryKeys(
		["page", "limit", "sort", "searchTerm", "color", "brand", "lensType", "material", "badge"],
		query
	);
	const result = new QueryBuilder(Lens.find({}), filteredQueryKey)
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

const getSingleLensService = async (slug: string) => {
	const result = await Lens.findOne({ slug: slug });
	return result;
};

const updateLensService = async (payload: any, id: string) => {
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
	const imageUrls: string[] = [];
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const lenses = await Lens.find({ _id: { $in: ids } });

	lenses.forEach((lens) => {
		imageUrls.push(...lens.images);
	});

	await Promise.all(imageUrls?.map((url) => deleteFromR2(url)));

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
