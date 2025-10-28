"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessoryService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const accessory_model_1 = __importDefault(require("./accessory.model"));
const createAccessoryService = async (payload) => {
    const result = await accessory_model_1.default.create(payload);
    return result;
};
const getAllAccessoryService = async (query) => {
    const result = new QueryBuilder_1.default(accessory_model_1.default.find({}), query)
        .search(["name", "type"])
        .fields()
        .filter()
        .sort()
        .pagination();
    const data = await result.modelQuery;
    const meta = await result.countTotal();
    return {
        meta,
        data,
    };
};
const getSingleAccessoryService = async (id) => {
    const result = await accessory_model_1.default.findById(id);
    return result;
};
const updateAccessoryService = async (id, payload) => {
    console.log(payload);
    const result = await accessory_model_1.default.findByIdAndUpdate(id, {
        type: payload.data.type,
        images: payload.images || [],
        items: payload.data.items,
    }, { new: true });
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
    }
    return result;
};
const deleteAccessoryService = async (ids) => {
    if (!ids || !ids.length) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No IDs provided");
    }
    const result = await accessory_model_1.default.deleteMany({ _id: { $in: ids } });
    return result;
};
exports.accessoryService = {
    createAccessoryService,
    getAllAccessoryService,
    getSingleAccessoryService,
    updateAccessoryService,
    deleteAccessoryService,
};
//# sourceMappingURL=accessory.service.js.map