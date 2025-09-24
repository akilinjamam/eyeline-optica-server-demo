import { Response } from "express";

type TMeta = {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
};

type TResponse<T> = {
	statusCode: number;
	success: boolean;
	message?: String;
	token?: string;
	data: T;
	meta?: TMeta;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
	res.status(data.statusCode).json({
		success: data.success,
		statuscode: data.statusCode,
		message: data.message,
		token: data.token,
		meta: data.meta,
		data: data.data,
	});
};

export default sendResponse;
