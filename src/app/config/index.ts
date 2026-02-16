import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
	NODE_ENV: process.env.NODE_ENV,
	port: process.env.PORT,
	db_url: process.env.DB_URL,
	cloude_name: process.env.CLOUDINARY_CLOUDE_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	jwt_secret: process.env.JWT_SECRET,
	sandbox_store_id: process.env.SANDBOX_STORE_ID,
	sandbox_store_pass: process.env.SANDBOX_STORE_PASSWORD,
	success_url: process.env.SUCCESS_URL,
	success_url_appointment: process.env.SUCCESS_URL_APPOINTMENT,
	fail_url: process.env.FAIL_URL,
	fail_url_appointment: process.env.FAIL_URL_APPOINTMENT,
	cancelled_url: process.env.CANCELLED_URL,
	cancelled_url_appointment: process.env.CANCELLED_URL_APPOINTMENT,
	agora_app_id: process.env.AGORA_APP_ID,
	agora_app_certificate: process.env.AGORA_PRIMARY_CERTIFICATE,
	sms_api_key: process.env.SMS_API_KEY,
	sms_sid: process.env.SMS_SID,
};
