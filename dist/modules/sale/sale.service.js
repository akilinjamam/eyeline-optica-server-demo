"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NewQueryBuilder_1 = __importDefault(require("../../app/middleware/NewQueryBuilder"));
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const customer_model_1 = __importDefault(require("../customer/customer.model"));
const sale_model_1 = require("./sale.model");
const AppError_1 = require("../../app/errors/AppError");
const http_status_codes_1 = require("http-status-codes");
const paymentHistory_model_1 = require("../paymentHistory/paymentHistory.model");
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
const updateStatusService = async (id, payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { paymentHistoryId, status } = payload;
        const findSale = await sale_model_1.Sale.findOne({ _id: id });
        if (!findSale)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "sales id not found");
        await sale_model_1.Sale.findByIdAndUpdate(id, { status }, { new: true, runValidators: true, session });
        const findPyamentHistory = await paymentHistory_model_1.PaymentHistory.findOne({ _id: paymentHistoryId });
        if (!findPyamentHistory)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "payment history id not found");
        await paymentHistory_model_1.PaymentHistory.findByIdAndUpdate(paymentHistoryId, { status }, { new: true, runValidators: true, session });
        await session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, error.messge);
    }
};
exports.salesService = {
    getSaleService,
    getCustomerService,
    updateStatusService,
};
//# sourceMappingURL=sale.service.js.map