import { v2 as cloudinary } from "cloudinary";
import config from "./index";

if (!config.cloude_name || !config.api_key || !config.api_secret) {
	throw new Error("Cloudinary configuration values are missing");
}

cloudinary.config({
	cloud_name: config.cloude_name as string,
	api_key: config.api_key as string,
	api_secret: config.api_secret as string,
});

export default cloudinary;
