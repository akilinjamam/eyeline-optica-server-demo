type Medicine = {
	name: string;
	dosage: string;
	frequency: string;
	duration: string;
};

export type TPrescription = {
	doctorId: string; // will hold ObjectId as string
	patientId: string; // will hold ObjectId as string
	date: string;
	diagnosis: string;
	medicines: Medicine[];
	tests: string;
	advice: string;
};
