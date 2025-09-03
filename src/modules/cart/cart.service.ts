import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import { Cart } from "./cart.model";
import { ICart } from "./cart.types";
import mongoose from "mongoose";
import { Profile } from "../profile/profile.model";

const createCartService = async (payload: ICart) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { username, phone, address, productId, lensId, quantity } = payload;

		// 1. Check or create Profile
		let profile = await Profile.findOne({ phone }).session(session);

		if (!profile) {
			const createdProfiles = await Profile.create([{ username, phone, address }], { session });
			profile = createdProfiles[0] ?? null;
		}

		if (!profile) {
			throw new Error("Failed to create or find profile.");
		}

		const result = await Cart.create(
			[
				{
					profileId: profile._id,
					username,
					phone,
					address,
					productId,
					lensId,
					quantity,
				},
			],
			{ session }
		);

		await session.commitTransaction();
		return result;
	} catch (error) {
		await session.abortTransaction();
		throw new AppError(StatusCodes.BAD_REQUEST, (error as Error).message);
	} finally {
		session.endSession();
	}
};

const getCartService = async () => {
	try {
		const carts = await Cart.find()
			.populate("profileId", "username phone address") // fetch profile details
			.populate("productId", "name price") // fetch product details (change fields as needed)
			.populate("lensId", "type price") // fetch lens details (change fields as needed)
			.exec();

		return carts;
	} catch (error) {
		throw new Error("Failed to fetch cart: " + (error as Error).message);
	}
};

export const cartService = {
	createCartService,
	getCartService,
};
