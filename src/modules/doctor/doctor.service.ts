import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import QueryBuilder from "../../app/middleware/QueryBuilder";
import { Doctor } from "./doctor.model";
import { IDoctor } from "./doctor.types";

export const createDoctorService = async (payload: IDoctor) => {
	return await Doctor.create(payload);
};

export const getSingleDoctorService = async (id: string) => {
	const result = await Doctor.find({ _id: id });

	return result;
};
export const getAllDoctorService = async (query: Record<string, unknown>) => {
	const result = new QueryBuilder(Doctor.find({}), query)
		.search(["name", "specialities"])
		.fields()
		.filter()
		.pagination();

	const data = await result.modelQuery;
	const meta = await result.countTotal();

	return {
		meta,
		data,
	};
};

const updateDoctorService = async (id: string, data: Record<string, unknown>) => {
	const result = await Doctor.findByIdAndUpdate(id, data, {
		runValidators: true,
		new: true,
	});

	if (!result) {
		throw new AppError(StatusCodes.NOT_FOUND, "sorry id not found");
	}

	return result;
};

export const doctorServices = {
	createDoctorService,
	getSingleDoctorService,
	getAllDoctorService,
	updateDoctorService,
};
