import mongoose from "mongoose";

import { ICreateStockInput, IStock } from "./stock.interface";
import { Stock } from "./stock.model";
import { FcbProduct } from "../product/product.model";

// Syncs the latest stock's prices, active stockId, and total available stock onto Product
const syncProductWithLatestStock = async (
	productId: mongoose.Types.ObjectId | string,
	session?: mongoose.ClientSession
) => {
	const latestStock = await Stock.findOne({ productId, isDeleted: false })
		.sort({ createdAt: -1 })
		.session(session || null);

	const stockAgg = await Stock.aggregate([
		{
			$match: {
				productId: new mongoose.Types.ObjectId(String(productId)),
				isDeleted: false,
			},
		},
		{
			$group: {
				_id: "$productId",
				totalStockQuantity: { $sum: "$remainingQuantity" },
			},
		},
	]).session(session || null);

	const totalStockQuantity = stockAgg[0]?.totalStockQuantity ?? 0;

	await FcbProduct.findByIdAndUpdate(
		productId,
		{
			stockId: latestStock ? latestStock._id : null,
			purchasePrice: latestStock ? latestStock.purchasePrice : 0,
			salesPrice: latestStock ? latestStock.salesPrice : 0,
			stockQuantity: totalStockQuantity,
			lowStockAlert: latestStock ? latestStock.lowStockAlert : 5,
		},
		{ session: session ?? null, new: true }
	);
};

const createStock = async (payload: ICreateStockInput) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		const product = await FcbProduct.findOne({
			_id: payload.productId,
			isDeleted: false,
		}).session(session);

		if (!product) {
			throw new Error("Product not found");
		}

		const [createdStock] = await Stock.create(
			[
				{
					productId: product._id,
					supplierId: payload.supplierId || null,
					batchCode: payload.batchCode,
					purchasePrice: payload.purchasePrice,
					salesPrice: payload.salesPrice,
					quantity: payload.quantity,
					remainingQuantity: payload.quantity,
					lowStockAlert: payload.lowStockAlert ?? product.lowStockAlert ?? 5,
					note: payload.note,
				},
			],
			{ session }
		);

		await syncProductWithLatestStock(product._id, session);

		await session.commitTransaction();
		return createdStock;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

const getAllStocks = async (query: Record<string, unknown>) => {
	const filter: Record<string, unknown> = { isDeleted: false };

	if (query.productId) {
		filter.productId = query.productId;
	}

	if (query.supplierId) {
		filter.supplierId = query.supplierId;
	}

	if (query.searchTerm) {
		filter.$or = [
			{ batchCode: { $regex: query.searchTerm, $options: "i" } },
			{ note: { $regex: query.searchTerm, $options: "i" } },
		];
	}

	return await Stock.find(filter)
		.populate("productId", "name sku slug unit")
		.populate("supplierId", "name companyName phone")
		.sort({ createdAt: -1 });
};

const getSingleStock = async (id: string) => {
	const stock = await Stock.findOne({ _id: id, isDeleted: false })
		.populate("productId", "name sku slug unit")
		.populate("supplierId", "name companyName phone");

	if (!stock) {
		throw new Error("Stock record not found");
	}

	return stock;
};

const updateStock = async (id: string, payload: Partial<IStock>) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		const existing = await Stock.findOne({ _id: id, isDeleted: false }).session(session);
		if (!existing) {
			throw new Error("Stock record not found");
		}

		const updated = await Stock.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
			new: true,
			runValidators: true,
			session,
		});

		if (!updated) {
			throw new Error("Stock record not found");
		}

		await syncProductWithLatestStock(updated.productId, session);

		await session.commitTransaction();
		return updated;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

const deleteStock = async (id: string) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		const deleted = await Stock.findOneAndUpdate(
			{ _id: id, isDeleted: false },
			{ isDeleted: true },
			{ new: true, session }
		);

		if (!deleted) {
			throw new Error("Stock record not found");
		}

		await syncProductWithLatestStock(deleted.productId, session);

		await session.commitTransaction();
		return deleted;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const StockServices = {
	createStock,
	getAllStocks,
	getSingleStock,
	updateStock,
	deleteStock,
	syncProductWithLatestStock,
};
