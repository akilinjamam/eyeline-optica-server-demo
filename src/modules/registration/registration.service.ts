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

	return result;
};

const createLoginService = async (payload: ILogin) => {
	const { email, password } = payload;

	const user = await RegistrationModel.findOne({ email });
	if (!user) {
		throw new AppError(StatusCodes.NOT_FOUND, "User not found");
	}

	// if (user.role !== role) {
	// 	throw new AppError(StatusCodes.UNAUTHORIZED, "Role doesn't matched");
	// }

	if (!user.access) {
		throw new AppError(StatusCodes.UNAUTHORIZED, "Please wait for permission to accept");
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

const getUserRegistrationService = async () => {
	const result = await RegistrationModel.find({}).select("-password -createdAt -updatedAt");

	return result;
};

const updateUserService = async (id: string, payload: Partial<IRegistration>) => {
	const user = await RegistrationModel.findById(id);
	if (!user) {
		throw new AppError(StatusCodes.NOT_FOUND, "User not found");
	}

	const updatedUser = await RegistrationModel.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	}).select("-password -createdAt -updatedAt");

	return updatedUser;
};

/**
 * Delete multiple users
 */
const deleteUsersService = async (ids: string[]) => {
	if (!ids || ids.length === 0) {
		throw new AppError(StatusCodes.BAD_REQUEST, "No IDs provided for deletion");
	}

	const result = await RegistrationModel.deleteMany({ _id: { $in: ids } });
	if (result.deletedCount === 0) {
		throw new AppError(StatusCodes.NOT_FOUND, "No users found to delete");
	}

	return result;
};

export const registrationService = {
	createRegistrationService,
	createLoginService,
	getUserRegistrationService,
	updateUserService,
	deleteUsersService,
};
