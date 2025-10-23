import NewQueryBuilder from "../../app/middleware/NewQueryBuilder";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Customer from "../customer/customer.model";
import { Sale } from "./sale.model";

const getSaleService = async (query: Record<string, unknown>) => {
	const result = new NewQueryBuilder(
		Sale.find({})
			.populate("productId", "name salesPrice purchase sold quantity stock _id")
			.populate("lensId", "name salesPrice purchasePrice sold quantity stock _id")
			.populate("contactLensId", "name salesPrice purchasePrice sold quantity stock _id")
			.populate({
				path: "accessoryId",
				select: "type items",
			})
			.populate("customerId", "name phoneNumber address"),
		query
	)
		.search(["saleType"])
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

const getCustomerService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Customer.find({}), query)
		.search(["name phoneNumber address email"])
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

export const salesService = {
	getSaleService,
	getCustomerService,
};
