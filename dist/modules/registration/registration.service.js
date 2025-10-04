"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const registration_model_1 = require("./registration.model");
const jwt_1 = require("../../app/utils/jwt");
const mongoose_1 = __importDefault(require("mongoose"));
const doctor_model_1 = require("../doctor/doctor.model");
const createRegistrationService = async (payload) => {
    const { email, role } = payload;
    const findUser = await registration_model_1.RegistrationModel.findOne({ email });
    if (findUser) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "User Already Registered");
    }
    if (role === "doctor") {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            await doctor_model_1.Doctor.create([{ email: email }], { session });
            const result = await registration_model_1.RegistrationModel.create([payload], { session });
            await session.commitTransaction();
            return result;
        }
        catch (error) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
        finally {
            await session.endSession();
        }
    }
    else {
        const result = await registration_model_1.RegistrationModel.create(payload);
        return result;
    }
};
const createLoginService = async (payload) => {
    const { email, password } = payload;
    const user = await registration_model_1.RegistrationModel.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    if (!user.access) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Please wait for permission to accept");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "Invalid Credentials");
    }
    const tokenData = {
        id: user?._id,
        role: user?.role,
        email: user?.email,
        name: user?.name,
    };
    const token = (0, jwt_1.generateToken)(tokenData);
    const resultWithtoken = { user, token: `Bearer ${token}` };
    return resultWithtoken;
};
const getUserRegistrationService = async () => {
    const result = await registration_model_1.RegistrationModel.find({}).select("-password -createdAt -updatedAt");
    return result;
};
const getCheckRoleOfUser = async (email, role) => {
    const checkUser = await registration_model_1.RegistrationModel.findOne({ email })?.select("-password -createdAt -updatedAt");
    if (!checkUser) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "user not found");
    }
    const isSameAsBefore = checkUser?.role === role ? "matched" : "not-matched";
    return isSameAsBefore;
};
const updateUserService = async (id, payload) => {
    const user = await registration_model_1.RegistrationModel.findById(id);
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    if ((user?.role === "doctor" || user?.role === "doctor & admin") &&
        (payload.role === "employee" ||
            payload?.role === "employee & admin" ||
            payload.role === "admin")) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "sorry you can not change role of doctor as employee or employee & admin or admin");
    }
    if ((user?.role === "employee" || user?.role === "employee & admin" || user?.role === "admin") &&
        (payload.role === "doctor" || payload?.role === "doctor & admin")) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "sorry you can not change role of employee as doctor or doctor & admin");
    }
    const updatedUser = await registration_model_1.RegistrationModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select("-password -createdAt -updatedAt");
    return updatedUser;
};
/**
 * Delete multiple users
 */
const deleteUsersService = async (ids) => {
    if (!ids || ids.length === 0) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No IDs provided for deletion");
    }
    const result = await registration_model_1.RegistrationModel.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "No users found to delete");
    }
    return result;
};
exports.registrationService = {
    createRegistrationService,
    createLoginService,
    getUserRegistrationService,
    getCheckRoleOfUser,
    updateUserService,
    deleteUsersService,
};
//# sourceMappingURL=registration.service.js.map