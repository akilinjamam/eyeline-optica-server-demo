"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesService = void 0;
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const sales_model_1 = require("./sales.model");
const createSalesService = async (payload) => {
    const result = await sales_model_1.SalesItem.create(payload);
    return result;
};
const getAllSalessService = async (query) => {
    const result = new QueryBuilder_1.default(sales_model_1.SalesItem.find({}), query)
        .search(["name", "type"])
        .filter()
        .fields()
        .pagination();
    const data = await result.modelQuery;
    const meta = await result.countTotal();
    return {
        meta,
        data,
    };
};
exports.salesService = {
    createSalesService,
    getAllSalessService,
};
//# sourceMappingURL=sales.service.js.map