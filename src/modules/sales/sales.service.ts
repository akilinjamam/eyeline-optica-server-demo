import QueryBuilder from "../../app/middleware/QueryBuilder";
import { SalesItem } from "./sales.model";
import { ISalesItem } from "./sales.types";

const createSalesService = async (payload: ISalesItem) => {
	const result = await SalesItem.create(payload);
	return result;
};

const getAllSalessService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(SalesItem.find({}), query)
		.search(["name", "type"])
		.filter()
		.fields()
		.pagination();

	const data = await result.modelQuery;
	const meta = await result.countTotal();

	return {
		meta,
		data,
	};
};

export const salesService = {
	createSalesService,
	getAllSalessService,
};
