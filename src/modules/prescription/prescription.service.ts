import QueryBuilder from "../../app/middleware/QueryBuilder";
import { Prescription } from "./prescription.model";
import { TPrescription } from "./prescription.type";

const createPrescriptionService = async (payload: TPrescription) => {
	const result = await Prescription.create(payload);
	return result;
};

const getAllPrescription = async (query: Record<string, unknown>) => {
	const response = new QueryBuilder(
		Prescription.find({}).populate("doctorId").populate("patientId"),
		query
	).sort();

	const data = await response.modelQuery;
	const meta = await response.countTotal();

	return {
		data,
		meta,
	};
};

const getSinglePrescription = async (id: string) => {
	const result = await Prescription.findById({ _id: id });
	return result;
};

const updatePrescription = async (payload: Record<string, unknown>, id: string) => {
	const result = await Prescription.findByIdAndUpdate(
		{ _id: id },
		{ $set: payload },
		{ runValidators: true, new: true }
	);

	return result;
};

const deletePrescription = async (ids: string[]) => {
	const result = await Prescription.deleteMany({ _id: { $in: ids } });
	return result;
};

export const prescriptionService = {
	createPrescriptionService,
	getAllPrescription,
	getSinglePrescription,
	updatePrescription,
	deletePrescription,
};
