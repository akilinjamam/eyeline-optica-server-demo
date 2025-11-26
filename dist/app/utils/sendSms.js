"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const sendSms = async (to, message) => {
    try {
        const response = await axios_1.default.post("https://smsplus.sslwireless.com/api/v3/send-sms", {
            api_token: config_1.default.sms_api_key,
            sid: config_1.default.sms_sid,
            msisdn: to,
            sms: message,
            csms_id: `csms_${Date.now()}`,
        });
        return response?.data;
    }
    catch (error) {
        console.log("SMS sending failed", error?.response?.data || error.message);
    }
};
exports.sendSms = sendSms;
//# sourceMappingURL=sendSms.js.map