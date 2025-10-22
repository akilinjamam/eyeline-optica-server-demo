"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentHistoryService = void 0;
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const paymentHistory_model_1 = require("./paymentHistory.model");
const getPaymentHistoryService = async (cus_id, query) => {
    const result = new QueryBuilder_1.default(paymentHistory_model_1.PaymentHistory.find({ customerId: cus_id })
        .populate("customerId", "_id name")
        .populate("productId", "_id name salesPrice")
        .populate("lensId", "_id name salesPrice")
        .populate("contactLensId", "_id name salesPrice")
        .populate("accessoryId"), query)
        .search(["payableAmount"])
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
const getSinglePaymentHistoryService = async (payment_his_id) => {
    const res = await paymentHistory_model_1.PaymentHistory.findOne({ _id: payment_his_id })
        .populate("customerId", "_id name")
        .populate("productId", "_id name salesPrice")
        .populate("lensId", "_id name salesPrice")
        .populate("contactLensId", "_id name salesPrice")
        .populate("accessoryId");
    return {
        data: res,
    };
};
exports.paymentHistoryService = {
    getPaymentHistoryService,
    getSinglePaymentHistoryService,
};
//# sourceMappingURL=paymentHistory.service.js.map