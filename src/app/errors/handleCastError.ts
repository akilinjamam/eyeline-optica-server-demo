import mongoose from "mongoose";
import { TErrorSource, TgenericErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TgenericErrorResponse => {
	const errorMessages: TErrorSource = [
		{
			path: err?.path,
			message: err?.message,
		},
	];

	const statusCode = 400;
	return {
		statusCode,
		message: "invalid id",
		errorMessages,
	};
};

export default handleCastError;
