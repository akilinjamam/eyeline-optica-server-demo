"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => (req, res, next) => {
    try {
        // validate request body
        req.body = schema.parse(req.body);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: error,
        });
    }
};
exports.default = validateRequest;
//# sourceMappingURL=validateRequest.js.map