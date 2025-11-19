"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agoraTokenService = void 0;
const agora_token_1 = require("agora-token");
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const config_1 = __importDefault(require("../../app/config"));
const createAgoraTokenService = async (payload) => {
    const { channelName, uid, role } = payload;
    if (!channelName && !uid && !role)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Missing Params");
    const appId = config_1.default.agora_app_id;
    const appCertificate = config_1.default.agora_app_certificate;
    const expirationTimeInSec = 3600;
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const privilegeExpTs = currentTimeStamp + expirationTimeInSec;
    const tokenExp = currentTimeStamp + expirationTimeInSec;
    const token = agora_token_1.RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role === "publisher" ? agora_token_1.RtcRole.PUBLISHER : agora_token_1.RtcRole.SUBSCRIBER, tokenExp, privilegeExpTs);
    return {
        token: token,
        appId: appId,
    };
};
exports.agoraTokenService = {
    createAgoraTokenService,
};
//# sourceMappingURL=agora.service.js.map