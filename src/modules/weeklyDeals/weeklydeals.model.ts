import mongoose, { Document, Schema } from "mongoose";

export interface IWeeklyDeals extends Document {
	title: string;
	description?: string;
	startDate: Date;
	endDate: Date;
	discountPercent: number;
	active: boolean;
	available?: boolean; // virtual field
}

const weeklyDealsSchema = new Schema<IWeeklyDeals>(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		discountPercent: { type: Number, required: true, min: 0, max: 100 },
		active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true }, // include virtuals when converting to JSON
		toObject: { virtuals: true }, // include virtuals when converting to plain object
	}
);

// ✅ Virtual field: automatically adds `available` to output
weeklyDealsSchema.virtual("available").get(function () {
	const now = new Date();
	return this.startDate <= now && this.endDate >= now && this.active;
});

export const WeeklyDeals = mongoose.model<IWeeklyDeals>("WeeklyDeals", weeklyDealsSchema);
