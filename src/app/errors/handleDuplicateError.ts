import { TErrorSource, TgenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TgenericErrorResponse => {
	const errorMessages: TErrorSource = [
		{
			path: "",

			message: err?.message,
		},
	];

	const statusCode = 400;
	return {
		statusCode,
		message: err?.message,
		errorMessages,
	};
};

export default handleDuplicateError;
