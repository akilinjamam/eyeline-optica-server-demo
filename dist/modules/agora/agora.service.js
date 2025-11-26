"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agoraTokenService = void 0;
const agora_access_token_1 = require("agora-access-token");
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const config_1 = __importDefault(require("../../app/config"));
const createAgoraTokenService = async (payload) => {
    const { channelName, uid, role } = payload;
    // use OR - throw if any required param is missing
    if (!channelName || !uid || !role)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Missing Params");
    const appId = config_1.default.agora_app_id;
    const appCertificate = config_1.default.agora_app_certificate;
    // 1 hour
    const expirationTimeInSec = 3600;
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const privilegeExpTs = currentTimeStamp + expirationTimeInSec;
    const rtcRole = role === "publisher" ? agora_access_token_1.RtcRole.PUBLISHER : agora_access_token_1.RtcRole.SUBSCRIBER;
    // build token for string user-account (use buildTokenWithAccount)
    const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithAccount(appId, appCertificate, channelName, uid, // account (string)
    rtcRole, privilegeExpTs);
    return {
        token,
        appId,
    };
};
exports.agoraTokenService = {
    createAgoraTokenService,
};
//# sourceMappingURL=agora.service.js.map