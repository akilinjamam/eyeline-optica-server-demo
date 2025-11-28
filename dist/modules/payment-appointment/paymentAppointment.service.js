"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentAppointmentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const patient_model_1 = require("../patient/patient.model");
const schedule_model_1 = require("../schedule/schedule.model");
const doctor_model_1 = require("../doctor/doctor.model");
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../../app/config"));
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const mongoose_1 = __importDefault(require("mongoose"));
const createPaymentAppontment = async (payload) => {
    const transectionId = `APNT${(0, uuid_1.v4)()}`;
    const findSlot = await schedule_model_1.Slot.findById(payload?.slotId);
    if (!findSlot)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "slot id not found");
    if (findSlot?.isBooked)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "slot is already booked");
    const findDoctor = await doctor_model_1.Doctor.findById(payload?.doctorId);
    if (!findDoctor)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "doctor not found");
    const appointmentFee = findDoctor?.appointmentFee;
    const slotId = findSlot?._id;
    const patientName = payload?.name;
    const patientPhoneNumber = payload?.phone;
    const patientAddress = payload?.address;
    const patientAge = payload?.age;
    const doctorId = payload?.doctorId;
    const is_live = false;
    const data = {
        total_amount: appointmentFee,
        currency: "BDT",
        tran_id: transectionId,
        success_url: `${config_1.default.success_url_appointment}=${slotId}&patientName=${patientName}&patientPhoneNumber=${patientPhoneNumber}&patientAge=${patientAge}&patientAddress=${patientAddress}&doctorId=${doctorId}`,
        // success_url: `http://localhost:5000/api/v1/ssl-appointment/payment-success-appointment?slotId=${slotId}&patientName=${patientName}&patientPhoneNumber=${patientPhoneNumber}&patientAge=${patientAge}&patientAddress=${patientAddress}&doctorId=${doctorId}`,
        fail_url: `${config_1.default.fail_url_appointment}`,
        // fail_url: `http://localhost:5000/api/v1/ssl-appointment/payment-fail-appointment`,
        cancel_url: `${config_1.default.cancelled_url_appointment}`,
        // cancel_url: `http://localhost:5000/api/v1/ssl-appointment/payment-cancelled-appointment`,
        ipn_url: "https://server.eyelineoptica.com/api/v1/ssl/ipn",
        shipping_method: "Courier",
        product_name: `appointment-service-${transectionId}`,
        product_category: "doctor_appointment_service",
        product_profile: "general",
        cus_name: patientName,
        cus_email: "no-email",
        cus_add1: patientAddress,
        cus_add2: patientAddress,
        cus_city: patientAddress,
        cus_state: patientAddress,
        cus_postcode: "4000",
        cus_country: "Bangladesh",
        cus_phone: patientPhoneNumber,
        cus_fax: patientPhoneNumber,
        ship_name: patientName,
        ship_add1: patientAddress,
        ship_add2: patientAddress,
        ship_city: patientAddress,
        ship_state: patientAddress,
        ship_postcode: 4000,
        ship_country: "Bangladesh",
    };
    const sslcz = new sslcommerz_lts_1.default(config_1.default.sandbox_store_id, config_1.default.sandbox_store_pass, is_live);
    const apiResponse = await sslcz.init(data);
    return apiResponse.GatewayPageURL;
};
const successPaymentAppointment = async (queryData) => {
    // 1. Start a Mongoose session
    const session = await mongoose_1.default.startSession();
    // 2. Start the transaction
    session.startTransaction();
    try {
        const slotId = queryData?.slotId;
        // --- Operation 1: Find Slot ---
        // Note: Find operation does not strictly need to be in the transaction
        // for rollback, but performing it within the session is good practice.
        const findSlot = await schedule_model_1.Slot.findById(queryData?.slotId).session(session);
        if (!findSlot) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "slot not found");
        }
        // --- Operation 2: Create Patient (Post Request) ---
        // Pass the session to the create operation
        const [createPatient] = await patient_model_1.Patient.create([queryData], { session });
        if (!createPatient) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FAILED_DEPENDENCY, "failed to create patient");
        }
        // Since Patient.create with { session } returns an array, we get the first element
        const patientId = createPatient?._id;
        // --- Operation 3: Update Slot (Update Request) ---
        // Pass the session to the update operation
        const updateSlot = await schedule_model_1.Slot.findByIdAndUpdate(slotId, { isBooked: true, patient: patientId }, { new: true, runValidators: true, session } // Pass the session here
        );
        if (!updateSlot) {
            // Although we checked findSlot, this handles concurrent updates or other failures
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FAILED_DEPENDENCY, "failed to update slot");
        }
        // 3. Commit the transaction if all operations succeed
        await session.commitTransaction();
        return {
            patientId,
        };
    }
    catch (error) {
        // 4. Rollback the transaction if any operation fails
        await session.abortTransaction();
        // Re-throw the error to be handled by the calling function/middleware
        throw error;
    }
    finally {
        // 5. End the session
        session.endSession();
    }
};
exports.paymentAppointmentService = {
    createPaymentAppontment,
    successPaymentAppointment,
};
//# sourceMappingURL=paymentAppointment.service.js.map