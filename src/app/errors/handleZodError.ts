import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TgenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TgenericErrorResponse => {
	const errorMessages: TErrorSource = err?.issues?.map((issue: ZodIssue) => {
		return {
			path: (issue.path[issue.path.length - 1] as string | number) ?? "unknown",
			message: issue.message,
		};
	});

	const statusCode = 400;

	return {
		statusCode,
		message: "Zod Validation Erorr",
		errorMessages,
	};
};

export default handleZodError;
