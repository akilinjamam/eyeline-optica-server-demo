/* eslint-disable no-unused-vars */
import { Document } from "mongoose";

export type Role = "doctor" | "employee" | "admin" | "employee & admin" | "doctor & admin";

export interface IRegistration extends Document {
	name: string;
	email: string;
	role: Role;
	password: string;
	access: boolean;
	comparePassword(_: string): Promise<boolean>;
}

export interface ILogin {
	email: string;
	role?: Role;
	password: string;
	access?: string;
}
