"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statuscode: data.statusCode,
        message: data.message,
        token: data.token,
        meta: data.meta,
        data: data.data,
    });
};
exports.default = sendResponse;
//# sourceMappingURL=sendResponse.js.map