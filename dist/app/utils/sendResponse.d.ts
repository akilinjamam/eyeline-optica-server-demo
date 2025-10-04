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
declare const sendResponse: <T>(res: Response, data: TResponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map