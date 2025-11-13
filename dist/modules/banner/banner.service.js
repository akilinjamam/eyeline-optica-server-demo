"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const banner_model_1 = __importDefault(require("./banner.model"));
const createBannerService = async (payload) => {
    const result = await banner_model_1.default.create(payload);
    return result;
};
const getAllBannerService = async (query) => {
    const result = new QueryBuilder_1.default(banner_model_1.default.find({}), query)
        .search(["category"])
        .filter()
        .fields()
        .sort()
        .pagination();
    const data = await result.modelQuery;
    const meta = await result.countTotal();
    return {
        meta,
        data,
    };
};
const getSingleBannerService = async (id) => {
    const result = await banner_model_1.default.findOne({ _id: id });
    return result;
};
const updateBannerService = async (payload, id) => {
    const result = await banner_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Banner not found");
    }
    return result;
};
const deleteBannerService = async (ids) => {
    if (!ids || !ids.length) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No IDs provided");
    }
    const result = await banner_model_1.default.deleteMany({ _id: { $in: ids } });
    return result;
};
exports.BannerService = {
    createBannerService,
    getAllBannerService,
    updateBannerService,
    deleteBannerService,
    getSingleBannerService,
};
//# sourceMappingURL=banner.service.js.map