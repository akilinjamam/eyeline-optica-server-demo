// middlewares/validateRequest.ts
import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest =
	(schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
		try {
			// validate request body
			req.body = schema.parse(req.body);
			next();
		} catch (error: any) {
			console.log(error);
			return res.status(400).json({
				success: false,
				message: "Validation Error",
				errors: error,
			});
		}
	};

export default validateRequest;
