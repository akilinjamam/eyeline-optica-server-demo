import { IPatient } from "../patient/patient.model";
export declare const paymentAppointmentService: {
    createPaymentAppontment: (payload: IPatient) => Promise<any>;
    successPaymentAppointment: (queryData: Record<string, unknown>) => Promise<"success" | "faled">;
};
//# sourceMappingURL=paymentAppointment.service.d.ts.map