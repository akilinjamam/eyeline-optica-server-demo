"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescriptionService = void 0;
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const prescription_model_1 = require("./prescription.model");
const createPrescriptionService = async (payload) => {
    const result = await prescription_model_1.Prescription.create(payload);
    return result;
};
const getAllPrescription = async (query) => {
    const response = new QueryBuilder_1.default(prescription_model_1.Prescription.find({}).populate("doctorId").populate("patientId"), query).sort();
    const data = await response.modelQuery;
    const meta = await response.countTotal();
    return {
        data,
        meta,
    };
};
const getSinglePrescription = async (id) => {
    const result = await prescription_model_1.Prescription.findById({ _id: id });
    return result;
};
const updatePrescription = async (payload, id) => {
    const result = await prescription_model_1.Prescription.findByIdAndUpdate({ _id: id }, { $set: payload }, { runValidators: true, new: true });
    return result;
};
const deletePrescription = async (ids) => {
    const result = await prescription_model_1.Prescription.deleteMany({ _id: { $in: ids } });
    return result;
};
exports.prescriptionService = {
    createPrescriptionService,
    getAllPrescription,
    getSinglePrescription,
    updatePrescription,
    deletePrescription,
};
//# sourceMappingURL=prescription.service.js.map