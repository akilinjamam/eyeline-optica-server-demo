import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: any, expiresIn = "15d") => {
	return jwt.sign(payload, config.jwt_secret as any, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, config.jwt_secret as string);
};
