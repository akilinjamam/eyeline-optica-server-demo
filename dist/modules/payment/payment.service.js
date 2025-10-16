"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../app/config"));
const AppError_1 = require("../../app/errors/AppError");
const cart_model_1 = require("../cart/cart.model");
const products_model_1 = __importDefault(require("../products/products.model"));
const sale_model_1 = require("../sale/sale.model");
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const uuid_1 = require("uuid");
const lenses_model_1 = require("../lenses/lenses.model");
const contactlens_model_1 = __importDefault(require("../contactLens/contactlens.model"));
const paymentHistory_model_1 = require("../paymentHistory/paymentHistory.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createPaymentService = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { cart_id, customer_name, customer_phone, customer_address, customer_email, payableAmount, dueAmount, quantity, } = payload;
        const findCart = (await cart_model_1.Cart.findOne({ _id: cart_id })
            .populate("items.productId")
            .populate("items.lensId")
            .populate("items.contactLensId"));
        if (!findCart)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "cart-not-found");
        const { productId, lensId, contactLensId, subtotal } = findCart?.items[0] || {};
        const deliveryFee = findCart?.deliveryFee;
        const { customerId } = findCart;
        const transectionId = `REF${(0, uuid_1.v4)()}`;
        let productName = "";
        if (productId && lensId)
            productName = `${productId?.name} + ${lensId?.name}`;
        if (productId && !lensId)
            productName = productId?.name;
        if (!productId && lensId)
            productName = lensId?.name;
        if (contactLensId)
            productName = contactLensId?.name;
        const date = new Date();
        const arrangeDate = `${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
        const getLastSales = await sale_model_1.Sale.findOne().sort({ createdAt: -1 });
        const lastInvoice = getLastSales?.invoiceNo?.slice(8);
        let newBarcode;
        if (lastInvoice === "99999") {
            newBarcode = "00001";
        }
        else {
            if (getLastSales) {
                const zeros = "00000";
                const zerosLength = zeros?.length;
                const convertIntoNumberAndAddOne = Number(lastInvoice) + 1;
                const barcodeNumberLength = convertIntoNumberAndAddOne?.toString()?.length;
                const remainingZerosLength = zerosLength - barcodeNumberLength;
                const remainingZeros = zeros?.slice(0, remainingZerosLength);
                newBarcode = `${remainingZeros}${convertIntoNumberAndAddOne}`;
            }
            else {
                newBarcode = "00001";
            }
        }
        const salesData = {
            invoiceNo: `${arrangeDate}${newBarcode}`,
            tran_id: transectionId,
            customerId,
            customer_name,
            customer_phone,
            customer_address,
            customer_email,
            payableAmount,
            dueAmount,
            quantity,
            productId: productId?._id,
            lensId: lensId?._id,
            contactLensId: contactLensId?._id,
            deliveryFee,
            subtotal,
        };
        // Stock validation
        if (productId) {
            if (productId.quantity === 0) {
                throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "frame out of stock");
            }
            if (productId.quantity < quantity)
                throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "frame amount you have given out of stock");
        }
        if (lensId) {
            if (lensId.quantity === 0) {
                throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "lens out of stock");
            }
            if (lensId.quantity < quantity)
                throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "frame amount you have given out of stock");
        }
        if (contactLensId) {
            if (contactLensId.quantity === 0) {
                throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "contact lens out of stock");
            }
            if (contactLensId.quantity < quantity) {
                throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "contact lens pair amount you have given out of stock");
            }
        }
        // Create Sale with transaction
        const saleDoc = (await sale_model_1.Sale.create([salesData], { session }));
        const salesId = saleDoc[0]._id;
        await session.commitTransaction();
        session.endSession();
        // SSLCommerz initialization (outside transaction)
        const is_live = false;
        const data = {
            total_amount: payableAmount,
            currency: "BDT",
            tran_id: transectionId,
            success_url: `${config_1.default.success_url}=${salesId}`,
            fail_url: `${config_1.default.fail_url}=${salesId}`,
            cancel_url: `${config_1.default.cancelled_url}=${salesId}`,
            ipn_url: "http://localhost:5000/ipn",
            shipping_method: "Courier",
            product_name: productName,
            product_category: "Optical",
            product_profile: "general",
            cus_name: customer_name,
            cus_email: customer_email,
            cus_add1: customer_address,
            cus_add2: customer_address,
            cus_city: customer_address,
            cus_state: customer_address,
            cus_postcode: "4000",
            cus_country: "Bangladesh",
            cus_phone: customer_phone,
            cus_fax: customer_phone,
            ship_name: customer_name,
            ship_add1: customer_address,
            ship_add2: customer_address,
            ship_city: customer_address,
            ship_state: customer_address,
            ship_postcode: 4000,
            ship_country: "Bangladesh",
        };
        const sslcz = new sslcommerz_lts_1.default(config_1.default.store_id, config_1.default.store_pass, is_live);
        const apiResponse = await sslcz.init(data);
        return apiResponse.GatewayPageURL;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const paymentSuccessService = async (salesId) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const findSales = (await sale_model_1.Sale.findOne({ _id: salesId })
            .populate("productId")
            .populate("lensId")
            .populate("contactLensId")
            .session(session));
        if (!findSales)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "sales-not-found");
        await sale_model_1.Sale.findByIdAndUpdate(findSales._id, { status: "Order received" }, { new: true, runValidators: true, session });
        // Product stock update
        const updateStock = async (model, item, soldQty) => {
            const remaining = item.quantity - soldQty;
            const sold = item.sold + soldQty;
            const update = { quantity: remaining, sold };
            if (remaining === 0)
                update.stock = false;
            await model.findByIdAndUpdate(item._id, update, { session, new: true, runValidators: true });
        };
        if (findSales.productId)
            await updateStock(products_model_1.default, findSales.productId, findSales.quantity);
        if (findSales.lensId)
            await updateStock(lenses_model_1.Lens, findSales.lensId, findSales.quantity);
        if (findSales.contactLensId)
            await updateStock(contactlens_model_1.default, findSales.contactLensId, findSales.quantity);
        // Save Payment History
        const { customerId, productId, lensId, contactLensId, payableAmount, dueAmount, deliveryFee, quantity, subtotal, } = findSales;
        const paymentHistoryData = {
            customerId,
            productId,
            lensId,
            contactLensId,
            payableAmount,
            dueAmount,
            deliveryFee,
            quantity,
            subtotal,
        };
        await paymentHistory_model_1.PaymentHistory.create([paymentHistoryData], { session });
        await session.commitTransaction();
        session.endSession();
        return "success";
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const paymentFailService = async (saleId) => {
    const result = await sale_model_1.Sale.deleteOne({ _id: saleId });
    if (result.acknowledged)
        return "saleData deleted";
};
const paymentCancelledService = async (saleId) => {
    const result = await sale_model_1.Sale.deleteOne({ _id: saleId });
    if (result.acknowledged)
        return "saleData deleted";
};
exports.paymentService = {
    createPaymentService,
    paymentSuccessService,
    paymentFailService,
    paymentCancelledService,
};
//# sourceMappingURL=payment.service.js.map