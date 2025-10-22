import QueryBuilder from "../../app/middleware/QueryBuilder";
import { PaymentHistory } from "./paymentHistory.model";

const getPaymentHistoryService = async (cus_id: string, query: Record<string, unknown>) => {
	const result = new QueryBuilder(PaymentHistory.find({ customerId: cus_id }), query)
		.search(["payableAmount"])
		.fields()
		.filter()
		.sort()
		.pagination();

	const data = await result.modelQuery;
	const meta = await result.countTotal();

	return {
		meta,
		data,
	};
};

export const paymentHistoryService = {
	getPaymentHistoryService,
};
