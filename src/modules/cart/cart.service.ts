import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import { Cart, ICart } from "./cart.model";

import { generateToken } from "../../app/utils/jwt";
import Customer from "../customer/customer.model";
import mongoose from "mongoose";

export const createCartService = async (payload: ICart) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		let customerId: string = "";

		// 🔹 Step 1: Find or create customer
		const findCustomer = await Customer.findOne({ phoneNumber: payload.phoneNumber }).session(
			session
		);

		if (!findCustomer) {
			const createNewCustomer = await Customer.create(
				[
					{
						name: payload.customerName,
						phoneNumber: payload.phoneNumber,
						email: payload.email,
						address: payload.address,
					},
				],
				{ session }
			);
			customerId = createNewCustomer[0]?._id.toString() as string;
		} else {
			customerId = findCustomer._id.toString();
		}

		// 🔹 Step 2: Create cart
		const newModifiedPayload = { ...payload, customerId };
		const result = await Cart.create([newModifiedPayload], { session });

		if (!result || result.length === 0) {
			throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create Cart");
		}

		const findCart = await Cart.findOne({ _id: result[0]?._id }).session(session);

		// 🔹 Step 3: Generate token
		const tokenData = {
			customerId: findCart?.customerId,
			id: findCart?._id,
			email: findCart?.email,
			name: findCart?.customerName,
			phoneNumber: findCart?.phoneNumber,
		};

		const token = generateToken(tokenData);

		await session.commitTransaction();
		session.endSession();

		return { token: `Bearer ${token}` };
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error("Transaction failed:", error);
		throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create Cart transactionally");
	}
};

const createCartWithPrescriptionImg = async (payload: any) => {
	const { items, prescriptionImg, ...remaining } = payload;
	const newModifiedItems = [{ ...items[0], prescriptionImg: prescriptionImg }];
	const newPayload = { ...remaining, items: newModifiedItems };

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		let customerId: string = "";

		// 🔹 Step 1: Find or create customer
		const findCustomer = await Customer.findOne({ phoneNumber: newPayload.phoneNumber }).session(
			session
		);

		if (!findCustomer) {
			const createNewCustomer = await Customer.create(
				[
					{
						name: payload.customerName,
						phoneNumber: payload.phoneNumber,
						email: payload.email,
						address: payload.address,
					},
				],
				{ session }
			);
			customerId = createNewCustomer[0]?._id.toString() as string;
		} else {
			customerId = findCustomer._id.toString();
		}

		// 🔹 Step 2: Create cart
		const newModifiedPayload = { ...newPayload, customerId };
		const result = await Cart.create([newModifiedPayload], { session });

		if (!result || result.length === 0) {
			throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create Cart");
		}

		const findCart = await Cart.findOne({ _id: result[0]?._id }).session(session);

		// 🔹 Step 3: Generate token
		const tokenData = {
			id: findCart?._id,
			email: findCart?.email,
			name: findCart?.customerName,
			phoneNumber: findCart?.phoneNumber,
		};

		const token = generateToken(tokenData);

		await session.commitTransaction();
		session.endSession();

		return { token: `Bearer ${token}` };
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error("Transaction failed:", error);
		throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create Cart transactionally");
	}
};

const getCartService = async (phoneNumber: string) => {
	try {
		const carts = await Cart.find({ phoneNumber })
			.populate("items.productId") // populate frame
			.populate("items.lensId") // populate lens
			.populate("items.contactLensId")
			.populate("items.accessoryId"); // populate accessory

		return carts;
	} catch (error) {
		throw new Error("Failed to fetch cart: " + (error as Error).message);
	}
};

const deleteCartService = async (id: string) => {
	const result = await Cart.deleteOne({ _id: id });
	return result;
};

export const cartService = {
	createCartService,
	createCartWithPrescriptionImg,
	getCartService,
	deleteCartService,
};
