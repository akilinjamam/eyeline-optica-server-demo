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
const updateLensService = async (payload, id) => {
    const result = await lenses_model_1.Lens.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
    }
    return result;
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
};
//# sourceMappingURL=lenses.service.js.map