import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
declare const validateRequest: (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default validateRequest;
//# sourceMappingURL=validateRequest.d.ts.map