"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const notFoundRoute = (req, res, next) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
        message: "Not Found vaiya",
    });
};
exports.default = notFoundRoute;
//# sourceMappingURL=notFoundRoute.js.map