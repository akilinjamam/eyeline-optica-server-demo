"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const products_model_1 = __importDefault(require("./products.model"));
const AppError_1 = require("../../app/errors/AppError");
const createProductService = async (payload) => {
    const result = await products_model_1.default.create(payload);
    return result;
};
const getAllProductsService = async (query) => {
    const result = new QueryBuilder_1.default(products_model_1.default.find({}), query)
        .search(["name", "type"])
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
const getSingleProductService = async (id) => {
    const result = await products_model_1.default.findOne({ _id: id });
    return result;
};
const updateProductService = async (payload, id) => {
    const result = await products_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
    }
    return result;
};
const deleteProductService = async (ids) => {
    if (!ids || !ids.length) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No IDs provided");
    }
    const result = await products_model_1.default.deleteMany({ _id: { $in: ids } });
    return result;
};
exports.productService = {
    createProductService,
    getAllProductsService,
    updateProductService,
    deleteProductService,
    getSingleProductService,
};
//# sourceMappingURL=products.service.js.map