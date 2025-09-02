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
		.pagination();

	const meta = await result.countTotal();
	const data = await result.modelQuery;

	return {
		meta,
		data,
	};
};

export const lenseService = {
	createLenseService,
	getAllLenseService,
};
