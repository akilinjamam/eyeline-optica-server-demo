"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesService = void 0;
const NewQueryBuilder_1 = __importDefault(require("../../app/middleware/NewQueryBuilder"));
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const customer_model_1 = __importDefault(require("../customer/customer.model"));
const sale_model_1 = require("./sale.model");
const getSaleService = async (query) => {
    const result = new NewQueryBuilder_1.default(sale_model_1.Sale.find({})
        .populate("productId", "name salesPrice purchase sold quantity stock _id")
        .populate("lensId", "name salesPrice purchasePrice sold quantity stock _id")
        .populate("contactLensId", "name salesPrice purchasePrice sold quantity stock _id")
        .populate({
        path: "accessoryId",
        select: "type items",
    })
        .populate("customerId", "name phoneNumber address"), query)
        .search(["saleType"])
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
const getCustomerService = async (query) => {
    const result = new QueryBuilder_1.default(customer_model_1.default.find({}), query)
        .search(["name phoneNumber address email"])
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
exports.salesService = {
    getSaleService,
    getCustomerService,
};
//# sourceMappingURL=sale.service.js.map