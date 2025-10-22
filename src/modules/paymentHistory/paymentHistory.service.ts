import QueryBuilder from "../../app/middleware/QueryBuilder";
import { PaymentHistory } from "./paymentHistory.model";

const getPaymentHistoryService = async (cus_id: string, query: Record<string, unknown>) => {
	const result = new QueryBuilder(
		PaymentHistory.find({ customerId: cus_id })
			.populate("customerId", "_id name")
			.populate("productId", "_id name salesPrice")
			.populate("lensId", "_id name salesPrice")
			.populate("contactLensId", "_id name salesPrice")
			.populate("accessoryId"),
		query
	)
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

const getSinglePaymentHistoryService = async (payment_his_id: string) => {
	const res = await PaymentHistory.findOne({ _id: payment_his_id });
	return res;
};

export const paymentHistoryService = {
	getPaymentHistoryService,
	getSinglePaymentHistoryService,
};
