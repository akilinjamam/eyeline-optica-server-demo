import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import sendResponse from "../utils/sendResponse";
import { RegistrationModel } from "../../modules/registration/registration.model";

export interface AuthRequest extends Request {
	user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		throw new AppError(StatusCodes.UNAUTHORIZED, "Not authorized");
	}

	try {
		const decoded = jwt.verify(token, config.jwt_secret as string) as any;

		if (!decoded) return;

		const checkRegistered = await RegistrationModel.findById(decoded?.id as string);

		if (!checkRegistered) throw new AppError(StatusCodes.UNAUTHORIZED, "user not registered");

		if (!checkRegistered.access)
			throw new AppError(StatusCodes.UNAUTHORIZED, "access not allowed yet");

		req.user = decoded;
		next();
	} catch (error) {
		sendResponse(res, {
			statusCode: StatusCodes.FORBIDDEN,
			success: false,
			message: "Token is invalid or expired",
			data: `the error is: ${error as any}`,
		});
	}
};
