import axios from "axios";
import config from "../config";

export const sendSms = async (to: string, message: string) => {
	try {
		const response = await axios.post("https://smsplus.sslwireless.com/api/v3/send-sms", {
			api_token: config.sms_api_key,
			sid: config.sms_sid,
			msisdn: to,
			sms: message,
			csms_id: `csms_${Date.now()}`,
		});

		return response?.data;
	} catch (error: any) {
		console.log("SMS sending failed", error?.response?.data || error.message);
	}
};
