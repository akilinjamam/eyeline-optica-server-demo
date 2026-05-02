import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import ContactLens from "./contactlens.model";
import { IContactLens } from "./contactlens.type";
import { AppError } from "../../app/errors/AppError";
import { slugify } from "../../app/utils/slugify";

const createContactLensService = async (payload: IContactLens) => {
	const slugifiedData = await slugify(payload, ContactLens, "name");
	const result = await ContactLens.create(slugifiedData);

	return result;
};

const getAllContactLenseService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(ContactLens.find({}), query)
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

const getSingleContactLensService = async (slug: string) => {
	const result = await ContactLens.findOne({ slug: slug });
	return result;
};

const updateContactLensService = async (payload: Record<string, unknown>, id: string) => {
	const result = await ContactLens.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "Lens not found");
	}

	return result;
};

const deleteContactLensService = async (ids: string[]) => {
	if (!ids || !ids.length) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided");
	}

	const result = await ContactLens.deleteMany({ _id: { $in: ids } });
	return result;
};

export const contactLensService = {
	createContactLensService,
	getAllContactLenseService,
	getSingleContactLensService,
	updateContactLensService,
	deleteContactLensService,
};
