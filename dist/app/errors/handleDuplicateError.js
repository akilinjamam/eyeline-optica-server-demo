"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const errorMessages = [
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
exports.default = handleDuplicateError;
//# sourceMappingURL=handleDuplicateError.js.map