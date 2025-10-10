import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import { Cart } from "./cart.model";
import { ICart } from "./cart.types";
import { generateToken } from "../../app/utils/jwt";

const createCartService = async (payload: ICart) => {
	const result = await Cart.create(payload);

	if (!result) {
		throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "failed to create Cart");
	}
	const findCart = await Cart.findOne({ _id: result._id });

	const tokenData = {
		id: findCart?._id,
		email: findCart?.email,
		name: findCart?.customerName,
	};

	const token = generateToken(tokenData);

	const resultWithtoken = { token: `Bearer ${token}` };

	return resultWithtoken;
};

const getCartService = async (id: string) => {
	try {
		const carts = await Cart.find({ _id: id })
			.populate("items.productId") // populate frame
			.populate("items.lensId") // populate lens
			.populate("items.contactLensId"); // populate contact lens
		// .populate("items.accessoryId"); // populate accessory

		return carts;
	} catch (error) {
		throw new Error("Failed to fetch cart: " + (error as Error).message);
	}
};

export const cartService = {
	createCartService,
	getCartService,
};
