type Medicine = {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
};
export type TPrescription = {
    doctorId: string;
    patientId: string;
    date: string;
    diagnosis: string;
    medicines: Medicine[];
    tests: string;
    advice: string;
};
export {};
//# sourceMappingURL=prescription.type.d.ts.map