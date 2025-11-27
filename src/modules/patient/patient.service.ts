import { Patient } from "./patient.model";

const getPatientForDoctorService = async (doctorId: string) => {
	const response = await Patient.find({ doctorId }).populate("doctorId");
	return response;
};

export const patientForDoctorService = {
	getPatientForDoctorService,
};
