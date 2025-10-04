"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactLensService = void 0;
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const contactlens_model_1 = __importDefault(require("./contactlens.model"));
const AppError_1 = require("../../app/errors/AppError");
const createContactLensService = async (payload) => {
    const result = await contactlens_model_1.default.create(payload);
    return result;
};
const getAllContactLenseService = async (query) => {
    const result = new QueryBuilder_1.default(contactlens_model_1.default.find({}), query)
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
const updateContactLensService = async (payload, id) => {
    const result = await contactlens_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Lens not found");
    }
    return result;
};
const deleteContactLensService = async (ids) => {
    if (!ids || !ids.length) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No IDs provided");
    }
    const result = await contactlens_model_1.default.deleteMany({ _id: { $in: ids } });
    return result;
};
exports.contactLensService = {
    createContactLensService,
    getAllContactLenseService,
    updateContactLensService,
    deleteContactLensService,
};
//# sourceMappingURL=contactlens.service.js.map