import mongoose from "mongoose";
import NewQueryBuilder from "../../app/middleware/NewQueryBuilder";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import Customer from "../customer/customer.model";
import { Sale } from "./sale.model";
import { AppError } from "../../app/errors/AppError";
import { StatusCodes } from "http-status-codes";
import { PaymentHistory } from "../paymentHistory/paymentHistory.model";

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

const updateStatusService = async (
	id: string,
	payload: { paymentHistoryId: string; status: string }
) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { paymentHistoryId, status } = payload;

		const findSale = await Sale.findOne({ _id: id });

		if (!findSale) throw new AppError(StatusCodes.NOT_ACCEPTABLE, "sales id not found");

		await Sale.findByIdAndUpdate(id, { status }, { new: true, runValidators: true, session });

		const findPyamentHistory = await PaymentHistory.findOne({ _id: paymentHistoryId });

		if (!findPyamentHistory)
			throw new AppError(StatusCodes.NOT_ACCEPTABLE, "payment history id not found");

		await PaymentHistory.findByIdAndUpdate(
			paymentHistoryId,
			{ status },
			{ new: true, runValidators: true, session }
		);

		await session.commitTransaction();
		session.endSession();
	} catch (error: any) {
		await session.abortTransaction();
		session.endSession();
		throw new AppError(StatusCodes.NOT_ACCEPTABLE, error.messge);
	}
};

export const salesService = {
	getSaleService,
	getCustomerService,
	updateStatusService,
};
