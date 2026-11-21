import mongoose from "mongoose";
import { FcbProduct } from "../product/product.model";

import { IFcbCreateSaleInput, IFcbSaleItem, TPaymentStatus } from "./sales.interface";
import { FcbSale } from "./sales.model";
import { FcbCustomer } from "../customer/customer.model";
import { Stock } from "../stock/stock.model";
import { StockServices } from "../stock/stock.service";

const generateInvoiceNo = () => {
	const now = new Date();
	const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
		now.getDate()
	).padStart(2, "0")}`;
	const randomPart = Math.floor(1000 + Math.random() * 9000);
	return `INV-${datePart}-${randomPart}`;
};

const resolvePaymentStatus = (totalAmount: number, paidAmount: number): TPaymentStatus => {
	if (paidAmount >= totalAmount) return "paid";
	if (paidAmount > 0) return "partial";
	return "due";
};

const createSale = async (payload: IFcbCreateSaleInput) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		let subtotalAmount = 0;
		const processedItems: IFcbSaleItem[] = [];
		const touchedProductIds = new Set<string>();

		for (const item of payload.items) {
			const product = await FcbProduct.findOne({
				_id: item.product,
				isDeleted: false,
			}).session(session);

			if (!product) {
				throw new Error(`Product not found: ${item.product}`);
			}

			if (product.stockQuantity < item.quantity) {
				throw new Error(
					`Insufficient stock for ${product.name} (Available: ${product.stockQuantity} ${product.unit})`
				);
			}

			// FIFO deduction across active stock batches (oldest first)
			const stockBatches = await Stock.find({
				productId: product._id,
				isDeleted: false,
				remainingQuantity: { $gt: 0 },
			})
				.sort({ createdAt: 1 })
				.session(session);

			let neededQty = item.quantity;
			let weightedCostSum = 0;

			for (const batch of stockBatches) {
				if (neededQty <= 0) break;

				const deductQty = Math.min(batch.remainingQuantity, neededQty);
				batch.remainingQuantity = Number((batch.remainingQuantity - deductQty).toFixed(4));
				await batch.save({ session });

				weightedCostSum += deductQty * batch.purchasePrice;
				neededQty = Number((neededQty - deductQty).toFixed(4));
			}

			if (neededQty > 0) {
				throw new Error(`Stock batch mismatch for ${product.name}`);
			}

			const costPriceAtSale = Number((weightedCostSum / item.quantity).toFixed(2));
			const subtotal = Number((item.sellingPrice * item.quantity).toFixed(2));
			subtotalAmount += subtotal;

			processedItems.push({
				product: product._id,
				quantity: item.quantity,
				sellingPrice: item.sellingPrice,
				costPriceAtSale,
				subtotal,
			});

			touchedProductIds.add(String(product._id));
		}

		// Re-sync mirrored stockQuantity & latest stock pointers on all affected products
		for (const productId of touchedProductIds) {
			await StockServices.syncProductWithLatestStock(productId, session);
		}

		const discount = payload.discount ?? 0;
		const totalAmount = Math.max(0, Number((subtotalAmount - discount).toFixed(2)));
		const dueAmount = Math.max(0, Number((totalAmount - payload.paidAmount).toFixed(2)));

		if (dueAmount > 0 && !payload.customer) {
			throw new Error("Customer is required when there is a due (baki) amount");
		}

		if (payload.customer) {
			const customer = await FcbCustomer.findOne({
				_id: payload.customer,
				isDeleted: false,
			}).session(session);

			if (!customer) {
				throw new Error("Customer not found");
			}

			if (dueAmount > 0) {
				await FcbCustomer.findByIdAndUpdate(
					customer._id,
					{ $inc: { totalDue: dueAmount } },
					{ session, new: true }
				);
			}
		}

		const paymentStatus = resolvePaymentStatus(totalAmount, payload.paidAmount);
		const invoiceNo = payload.invoiceNo?.trim() || generateInvoiceNo();

		const [createdSale] = await FcbSale.create(
			[
				{
					invoiceNo,
					customer: payload.customer || null,
					items: processedItems,
					subtotalAmount: Number(subtotalAmount.toFixed(2)),
					discount,
					totalAmount,
					paidAmount: payload.paidAmount,
					dueAmount,
					paymentMethod: payload.paymentMethod || "cash",
					paymentStatus,
					saleDate: payload.saleDate ? new Date(payload.saleDate) : new Date(),
					note: payload.note,
				},
			],
			{ session }
		);

		await session.commitTransaction();
		return createdSale;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

const getAllSales = async (query: Record<string, unknown>) => {
	const filter: Record<string, unknown> = { isDeleted: false };

	if (query.customer) {
		filter.customer = query.customer;
	}

	if (query.paymentStatus) {
		filter.paymentStatus = query.paymentStatus;
	}

	if (query.paymentMethod) {
		filter.paymentMethod = query.paymentMethod;
	}

	if (query.startDate || query.endDate) {
		const saleDateFilter: Record<string, Date> = {};
		if (query.startDate) {
			saleDateFilter.$gte = new Date(String(query.startDate));
		}
		if (query.endDate) {
			saleDateFilter.$lte = new Date(String(query.endDate));
		}
		filter.saleDate = saleDateFilter;
	}

	if (query.searchTerm) {
		filter.$or = [
			{ invoiceNo: { $regex: query.searchTerm, $options: "i" } },
			{ note: { $regex: query.searchTerm, $options: "i" } },
		];
	}

	return await FcbSale.find(filter)
		.populate("customer", "name phone type totalDue")
		.populate("items.product", "name sku slug unit salesPrice purchasePrice")
		.sort({ saleDate: -1, createdAt: -1 });
};

const getSingleSale = async (id: string) => {
	const sale = await FcbSale.findOne({ _id: id, isDeleted: false })
		.populate("customer", "name phone address type totalDue")
		.populate("items.product", "name sku slug unit salesPrice purchasePrice");

	if (!sale) {
		throw new Error("Sale record not found");
	}

	return sale;
};

const updateSaleMeta = async (id: string, payload: { paymentMethod?: string; note?: string }) => {
	const updated = await FcbSale.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
		new: true,
		runValidators: true,
	});

	if (!updated) {
		throw new Error("Sale record not found");
	}

	return updated;
};

const cancelOrDeleteSale = async (id: string) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		const sale = await FcbSale.findOne({ _id: id, isDeleted: false }).session(session);
		if (!sale) {
			throw new Error("Sale record not found");
		}

		const touchedProductIds = new Set<string>();

		// Restore remainingQuantity back onto stock batches (latest batch first)
		for (const item of sale.items) {
			let restoreQty = item.quantity;
			const batches = await Stock.find({
				productId: item.product,
				isDeleted: false,
			})
				.sort({ createdAt: -1 })
				.session(session);

			for (const batch of batches) {
				if (restoreQty <= 0) break;
				const maxRestorable = Math.max(0, batch.quantity - batch.remainingQuantity);
				if (maxRestorable > 0) {
					const addBack = Math.min(maxRestorable, restoreQty);
					batch.remainingQuantity = Number((batch.remainingQuantity + addBack).toFixed(4));
					await batch.save({ session });
					restoreQty = Number((restoreQty - addBack).toFixed(4));
				}
			}

			// Fallback if batch quantities were manually adjusted
			if (restoreQty > 0 && batches[0]) {
				batches[0].remainingQuantity = Number(
					(batches[0].remainingQuantity + restoreQty).toFixed(4)
				);
				batches[0].quantity = Math.max(batches[0].quantity, batches[0].remainingQuantity);
				await batches[0].save({ session });
			}

			touchedProductIds.add(String(item.product));
		}

		for (const productId of touchedProductIds) {
			await StockServices.syncProductWithLatestStock(productId, session);
		}

		if (sale.customer && sale.dueAmount > 0) {
			await FcbCustomer.findByIdAndUpdate(
				sale.customer,
				{ $inc: { totalDue: -sale.dueAmount } },
				{ session }
			);
		}

		sale.isDeleted = true;
		await sale.save({ session });

		await session.commitTransaction();
		return sale;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const SaleServices = {
	createSale,
	getAllSales,
	getSingleSale,
	updateSaleMeta,
	cancelOrDeleteSale,
};
