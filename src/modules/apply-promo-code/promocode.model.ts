import { Schema, model, Document } from "mongoose";

export interface IPromo extends Document {
	name: string;
	amount: number;
	percent: boolean;
	active: boolean;
	startTime: Date;
	endTime: Date;
}

const promocodeSchema = new Schema<IPromo>({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	amount: {
		type: Number,
		required: true,
		trim: true,
	},
	percent: {
		type: Boolean,
		default: false,
	},
	active: {
		type: Boolean,
		default: false,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
});

const Promo = model<IPromo>("Promo", promocodeSchema);
export default Promo;
