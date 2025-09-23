import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import ContactLens from "./contactlens.model";
import { IContactLens } from "./contactlens.type";
import { AppError } from "../../app/errors/AppError";

const createContactLensService = async (payload: IContactLens) => {
	const result = await ContactLens.create(payload);

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
	updateContactLensService,
	deleteContactLensService,
};
