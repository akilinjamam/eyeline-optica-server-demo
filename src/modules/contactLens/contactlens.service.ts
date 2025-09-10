import QueryBuilder from "../../app/middleware/QueryBuilder";
import ContactLens from "./contactlens.model";
import { IContactLens } from "./contactlens.type";

const createContactLensService = async (payload: IContactLens) => {
	const result = await ContactLens.create(payload);

	return result;
};

const getAllContactLenseService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(ContactLens.find({}), query)
		.search(["name", "description"])
		.filter()
		.fields()
		.pagination();

	const meta = await result.countTotal();
	const data = await result.modelQuery;

	return {
		meta,
		data,
	};
};

export const contactLensService = {
	createContactLensService,
	getAllContactLenseService,
};
