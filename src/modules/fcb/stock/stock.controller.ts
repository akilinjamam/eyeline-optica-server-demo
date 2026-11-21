import { Request, Response } from "express";
import { StockServices } from "./stock.service";
import catchAsync from "../../../app/utils/catchAsync";
import sendResponse from "../../../app/utils/sendResponse";

const createStock = catchAsync(async (req: Request, res: Response) => {
	const result = await StockServices.createStock(req.body);
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Stock added and product prices updated successfully",
		data: result,
	});
});

const getAllStocks = catchAsync(async (req: Request, res: Response) => {
	const result = await StockServices.getAllStocks(req.query);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Stock records retrieved successfully",
		data: result,
	});
});

const getSingleStock = catchAsync(async (req: Request, res: Response) => {
	const result = await StockServices.getSingleStock(req.params.id as string);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Stock record retrieved successfully",
		data: result,
	});
});

const updateStock = catchAsync(async (req: Request, res: Response) => {
	const result = await StockServices.updateStock(req.params.id as string, req.body);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Stock updated and product prices synced successfully",
		data: result,
	});
});

const deleteStock = catchAsync(async (req: Request, res: Response) => {
	const result = await StockServices.deleteStock(req.params.id as string);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Stock deleted and product prices synced successfully",
		data: result,
	});
});

export const StockControllers = {
	createStock,
	getAllStocks,
	getSingleStock,
	updateStock,
	deleteStock,
};
