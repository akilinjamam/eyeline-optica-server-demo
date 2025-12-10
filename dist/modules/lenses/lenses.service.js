"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lenseService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const lenses_model_1 = require("./lenses.model");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = __importDefault(require("../../app/config/cloudinary"));
const processPubliceId_1 = require("../../app/utils/processPubliceId");
const createLenseService = async (payload) => {
    const result = await lenses_model_1.Lens.create(payload);
    return result;
};
const getAllLenseService = async (query) => {
    const result = new QueryBuilder_1.default(lenses_model_1.Lens.find({}), query)
        .search(["name", "description"])
        .filter()
        .fields()
        .sort()
        .pagination();
    const meta = await result.countTotal();
    const data = await result.modelQuery;
    return {
        meta,
        data,
    };
};
const getSingleLensService = async (id) => {
    const result = await lenses_model_1.Lens.findOne({ _id: id });
    return result;
};
const updateLensService = async (payload, id) => {
    const publicIds = (0, processPubliceId_1.processPublicIds)(payload?.imageIds);
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const result = await lenses_model_1.Lens.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
            session,
        });
        if (!result) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
        }
        const delatableIds = publicIds || [];
        if (delatableIds.length > 0) {
            for (const imgId of delatableIds) {
                await cloudinary_1.default.uploader.destroy(imgId);
            }
        }
        await session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
    }
};
const deleteLensService = async (ids) => {
    if (!ids || !ids.length) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No IDs provided");
    }
    const result = await lenses_model_1.Lens.deleteMany({ _id: { $in: ids } });
    return result;
};
exports.lenseService = {
    createLenseService,
    getAllLenseService,
    updateLensService,
    deleteLensService,
    getSingleLensService,
};
//# sourceMappingURL=lenses.service.js.map