"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorServices = exports.getAllDoctorService = exports.getSingleDoctorService = exports.createDoctorService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const doctor_model_1 = require("./doctor.model");
const createDoctorService = async (payload) => {
    return await doctor_model_1.Doctor.create(payload);
};
exports.createDoctorService = createDoctorService;
const getSingleDoctorService = async (email) => {
    const result = await doctor_model_1.Doctor.findOne({ email });
    return result;
};
exports.getSingleDoctorService = getSingleDoctorService;
const getAllDoctorService = async (query) => {
    const result = new QueryBuilder_1.default(doctor_model_1.Doctor.find({}), query)
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
exports.getAllDoctorService = getAllDoctorService;
const updateDoctorService = async (id, data) => {
    const result = await doctor_model_1.Doctor.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "sorry id not found");
    }
    return result;
};
exports.doctorServices = {
    createDoctorService: exports.createDoctorService,
    getSingleDoctorService: exports.getSingleDoctorService,
    getAllDoctorService: exports.getAllDoctorService,
    updateDoctorService,
};
//# sourceMappingURL=doctor.service.js.map