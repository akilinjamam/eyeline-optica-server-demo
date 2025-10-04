"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../errors/AppError");
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Not authorized");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.FORBIDDEN,
            success: false,
            message: "Token is invalid or expired",
            data: `the error is: ${error}`,
        });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map