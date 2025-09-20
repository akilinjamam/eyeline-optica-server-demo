import { Types } from "mongoose";

// Review type for individual patient reviews
export interface IReview {
	doctor: Types.ObjectId | IDoctor;
	reviewerName: string;
	comment: string;
	rating: number;
	date: Date;
}

// Doctor type
export interface IDoctor {
	name: string;
	specialities: string[];
	studies: string[];
	totalExperience: number;
	bmdcNumber: string;
	currentlyWorking?: string;
	description?: string;
	experienceDetail?: string;
	images: string[];
}
