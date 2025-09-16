import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import { RegistrationModel } from "./registration.model";
import { ILogin, IRegistration } from "./registration.type";
import { generateToken } from "../../app/utils/jwt";

const createRegistrationService = async (payload: IRegistration) => {
	const { email } = payload;
	const findUser = await RegistrationModel.findOne({ email });

	if (findUser) {
		throw new AppError(StatusCodes.FORBIDDEN, "User Already Registered");
	}

	const result = await RegistrationModel.create(payload);

	const tokenData = {
		id: result?._id,
		role: result?.role,
		email: result?.email,
		name: result?.name,
	};
	const token = generateToken(tokenData);

	const tokenWithResult = { result, token: `Bearer ${token}` };

	return tokenWithResult;
};

const createLoginService = async (payload: ILogin) => {
	const { email, password } = payload;

	const user = await RegistrationModel.findOne({ email });
	if (!user) {
		throw new AppError(StatusCodes.NOT_FOUND, "User not found");
	}

	const isMatch = await user.comparePassword(password);

	if (!isMatch) {
		throw new AppError(StatusCodes.FORBIDDEN, "Invalid Credentials");
	}

	const tokenData = {
		id: user?._id,
		role: user?.role,
		email: user?.email,
		name: user?.name,
	};

	const token = generateToken(tokenData);

	const resultWithtoken = { user, token: `Bearer ${token}` };

	return resultWithtoken;
};

export const registrationService = {
	createRegistrationService,
	createLoginService,
};
