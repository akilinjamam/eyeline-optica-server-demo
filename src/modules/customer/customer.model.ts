import mongoose, { Schema } from "mongoose";
import { TCustomer } from "./customer.type";

const customerSchema: Schema<TCustomer> = new Schema(
	{
		name: { type: String, default: "not-added" },
		email: { type: String, default: "not-added" },
		phoneNumber: { type: String, required: true },
		address: { type: String, default: " not-added" },
	},
	{
		timestamps: true,
	}
);

const Customer = mongoose.model<TCustomer>("Customer", customerSchema);
export default Customer;
