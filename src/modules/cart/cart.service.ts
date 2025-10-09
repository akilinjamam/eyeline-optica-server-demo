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
		role: findCart?.address,
		email: findCart?.email,
		name: findCart?.customerName,
	};

	const token = generateToken(tokenData);

	const resultWithtoken = { token: `Bearer ${token}` };

	return resultWithtoken;
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
