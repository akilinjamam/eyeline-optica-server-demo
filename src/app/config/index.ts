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
	store_id: process.env.STORE_ID,
	store_pass: process.env.STORE_PASSWORD,
	success_url: process.env.SUCCESS_URL,
	fail_url: process.env.FAIL_URL,
	cancelled_url: process.env.CANCELLED_URL,
};
