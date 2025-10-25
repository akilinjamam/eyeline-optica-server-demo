import { StatusCodes } from "http-status-codes";
import config from "../../app/config";
import { AppError } from "../../app/errors/AppError";
import { Cart, ICart } from "../cart/cart.model";
import Product from "../products/products.model";
import { Sale } from "../sale/sale.model";
import { TPaymentData } from "./payment.type";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";
import { Lens } from "../lenses/lenses.model";
import ContactLens from "../contactLens/contactlens.model";
import { PaymentHistory } from "../paymentHistory/paymentHistory.model";
import mongoose from "mongoose";
import Accessory from "../accessory/accessory.model";

const createPaymentService = async (payload: TPaymentData) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const {
			cart_id,
			customer_name,
			customer_phone,
			customer_address,
			customer_email,
			payableAmount,
			dueAmount,
			quantity,
		} = payload;

		const findCart = (await Cart.findOne({ _id: cart_id })
			.populate("items.productId")
			.populate("items.lensId")
			.populate("items.contactLensId")
			.populate("items.accessoryId")) as any;

		if (!findCart) throw new AppError(StatusCodes.NOT_FOUND, "cart-not-found");

		const {
			productId,
			lensId,
			contactLensId,
			accessoryId,
			subtotal,
			pd,
			prescriptionImg,
			rightEye,
			leftEye,
			submitType,
		} = findCart?.items[0] || ({} as any);
		const deliveryFee = findCart?.deliveryFee;
		const { customerId } = findCart as ICart;

		const transectionId = `REF${uuidv4()}`;
		let productName = "";
		let saleType = "";

		if (productId && lensId) {
			productName = `${productId?.name} + ${lensId?.name}`;
			saleType = "Frame and Lens";
		}
		if (productId && !lensId) {
			productName = productId?.name;
			saleType = "Only Frame";
		}
		if (!productId && lensId) {
			productName = lensId?.name;
			saleType = "Only Lens";
		}
		if (contactLensId && !accessoryId) {
			productName = contactLensId?.name;
			saleType = "Only Contact-Lens";
		}
		if (!contactLensId && accessoryId) {
			productName = accessoryId?.type;
			saleType = "Only Accessory";
		}
		if (contactLensId && accessoryId) {
			productName = `${contactLensId?.name} + ${accessoryId?.type}`;
			saleType = "Contact-Lens and Accessory";
		}

		const date = new Date();
		const arrangeDate = `${date.getFullYear()}${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

		const getLastSales = await Sale.findOne().sort({ createdAt: -1 });
		const lastInvoice = getLastSales?.invoiceNo?.slice(8);
		let newBarcode;

		if (lastInvoice === "99999") {
			newBarcode = "00001";
		} else {
			if (getLastSales) {
				const zeros = "00000";
				const zerosLength = zeros?.length;
				const convertIntoNumberAndAddOne = Number(lastInvoice) + 1;
				const barcodeNumberLength = convertIntoNumberAndAddOne?.toString()?.length;
				const remainingZerosLength = zerosLength - barcodeNumberLength;
				const remainingZeros = zeros?.slice(0, remainingZerosLength);
				newBarcode = `${remainingZeros}${convertIntoNumberAndAddOne}`;
			} else {
				newBarcode = "00001";
			}
		}

		const salesData = {
			invoiceNo: `${arrangeDate}${newBarcode}`,
			tran_id: transectionId,
			saleType,
			customerId,
			customer_name,
			customer_phone,
			customer_address,
			customer_email,
			payableAmount,
			dueAmount,
			quantity,
			productId: productId?._id,
			lensId: lensId?._id,
			contactLensId: contactLensId?._id,
			accessoryId: accessoryId?._id,
			deliveryFee,
			subtotal,
			submitType,
			pd,
			prescriptionImg,
			leftEye,
			rightEye,
		};
		console.log(salesData);
		// Stock validation
		if (productId) {
			if (productId.quantity === 0) {
				throw new AppError(StatusCodes.NOT_ACCEPTABLE, "frame out of stock");
			}
			if (productId.quantity < quantity)
				throw new AppError(StatusCodes.NOT_ACCEPTABLE, "frame amount you have given out of stock");
		}
		if (lensId) {
			if (lensId.quantity === 0) {
				throw new AppError(StatusCodes.NOT_ACCEPTABLE, "lens out of stock");
			}
			if (lensId.quantity < quantity)
				throw new AppError(StatusCodes.NOT_ACCEPTABLE, "frame amount you have given out of stock");
		}
		if (contactLensId) {
			if (contactLensId.quantity === 0) {
				throw new AppError(StatusCodes.NOT_ACCEPTABLE, "contact lens out of stock");
			}
			if (contactLensId.quantity < quantity) {
				throw new AppError(
					StatusCodes.NOT_ACCEPTABLE,
					"contact lens pair amount you have given out of stock"
				);
			}
		}

		if (accessoryId) {
			const findZeroQty = accessoryId?.items?.map((qty: any) => qty.quantity);
			if (findZeroQty.some((qty: number) => qty < quantity)) {
				throw new AppError(
					StatusCodes.NOT_ACCEPTABLE,
					"accessory amount you have given out of stock"
				);
			}
			if (findZeroQty.includes(0)) {
				throw new AppError(StatusCodes.NOT_ACCEPTABLE, "accessory out of stock");
			}
		}

		// Create Sale with transaction
		const saleDoc = (await Sale.create([salesData], { session })) as any;
		const salesId = saleDoc[0]._id;

		await session.commitTransaction();
		session.endSession();
		// success_url: `${config.success_url}=${salesId}`,
		// SSLCommerz initialization (outside transaction)
		const is_live = false;
		const data = {
			total_amount: payableAmount,
			currency: "BDT",
			tran_id: transectionId,
			success_url: `${config.success_url}=${salesId}`,
			fail_url: `${config.fail_url}=${salesId}`,
			cancel_url: `${config.cancelled_url}=${salesId}`,
			ipn_url: "https://server.eyelineoptica.com/api/v1/ssl/ipn",
			shipping_method: "Courier",
			product_name: productName,
			product_category: "Optical",
			product_profile: "general",
			cus_name: customer_name,
			cus_email: customer_email,
			cus_add1: customer_address,
			cus_add2: customer_address,
			cus_city: customer_address,
			cus_state: customer_address,
			cus_postcode: "4000",
			cus_country: "Bangladesh",
			cus_phone: customer_phone,
			cus_fax: customer_phone,
			ship_name: customer_name,
			ship_add1: customer_address,
			ship_add2: customer_address,
			ship_city: customer_address,
			ship_state: customer_address,
			ship_postcode: 4000,
			ship_country: "Bangladesh",
		};

		const sslcz = new SSLCommerzPayment(
			config.sandbox_store_id,
			config.sandbox_store_pass,
			is_live
		);
		const apiResponse = await sslcz.init(data);
		return apiResponse.GatewayPageURL;
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

const paymentSuccessService = async (salesId: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const findSales = (await Sale.findOne({ _id: salesId })
			.populate("productId")
			.populate("lensId")
			.populate("contactLensId")
			.populate("accessoryId")
			.session(session)) as any;

		if (!findSales) throw new AppError(StatusCodes.NOT_FOUND, "sales-not-found");

		// Product stock update
		const updateStock = async (model: any, item: any, soldQty: number) => {
			const remaining = item.quantity - soldQty;
			const sold = item.sold + soldQty;
			const update: any = { quantity: remaining, sold };
			if (remaining === 0) update.stock = false;
			await model.findByIdAndUpdate(item._id, update, { session, new: true, runValidators: true });
		};

		if (findSales.productId) await updateStock(Product, findSales.productId, findSales.quantity);
		if (findSales.lensId) await updateStock(Lens, findSales.lensId, findSales.quantity);
		if (findSales.contactLensId)
			await updateStock(ContactLens, findSales.contactLensId, findSales.quantity);

		// Update Accessory stock
		if (findSales?.accessoryId) {
			const soldQty = findSales?.quantity;

			// Step 1: decrement quantity & increment sold
			await Accessory.updateOne(
				{ _id: findSales?.accessoryId._id },
				{ $inc: { "items.$[].quantity": -soldQty, "items.$[].sold": soldQty } },
				{ session }
			);

			// Step 2: set stock=false for items where quantity <= 0
			await Accessory.updateOne(
				{ _id: findSales?.accessoryId._id },
				{ $set: { "items.$[elem].stock": false } },
				{ arrayFilters: [{ "elem.quantity": { $lte: 0 } }], session }
			);
		}

		// Save Payment History
		const {
			customerId,
			productId,
			lensId,
			contactLensId,
			accessoryId,
			payableAmount,
			dueAmount,
			deliveryFee,
			quantity,
			subtotal,
		} = findSales;

		const paymentHistoryData = {
			customerId,
			productId,
			lensId,
			contactLensId,
			accessoryId,
			payableAmount,
			dueAmount,
			deliveryFee,
			quantity,
			subtotal,
		};

		const [paymentHistory] = await PaymentHistory.create([paymentHistoryData], { session });

		await Sale.findByIdAndUpdate(
			findSales._id,
			{ status: "Order received", paymentHistoryId: paymentHistory?._id },
			{ new: true, runValidators: true, session }
		);

		await session.commitTransaction();
		session.endSession();

		return "success";
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

const paymentFailService = async (saleId: string) => {
	const result = await Sale.deleteOne({ _id: saleId });
	if (result.acknowledged) return "saleData deleted";
};

const paymentCancelledService = async (saleId: string) => {
	const result = await Sale.deleteOne({ _id: saleId });
	if (result.acknowledged) return "saleData deleted";
};

export const paymentService = {
	createPaymentService,
	paymentSuccessService,
	paymentFailService,
	paymentCancelledService,
};
