import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import { Patient } from "../patient/patient.model";
import { generateToken } from "../../app/utils/jwt";

const createPatientLogin = async (phoneNumber: string) => {
	const findNumber = await Patient.findOne({ phone: phoneNumber });
	if (!findNumber)
		throw new AppError(StatusCodes.NOT_ACCEPTABLE, "please book a slot first. then login");

	const findPatient = await Patient.findOne({ phone: phoneNumber }).sort({ createdAt: -1 });

	const tokenData = {
		patientId: findPatient?._id,
		name: findPatient?.name,
		phone: findPatient?.phone,
		age: findPatient?.age,
		address: findPatient?.address,
		slotId: findPatient?.slotId,
	};

	const token = generateToken(tokenData);

	return `Beared ${token}`;
};

export const patientLoginService = {
	createPatientLogin,
};
