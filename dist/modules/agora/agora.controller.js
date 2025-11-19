"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agoraTokenController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const agora_service_1 = require("./agora.service");
const createAgoraTokenController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await agora_service_1.agoraTokenService.createAgoraTokenService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Agora token created successfully",
        data: result,
    });
});
exports.agoraTokenController = {
    createAgoraTokenController,
};
//# sourceMappingURL=agora.controller.js.map