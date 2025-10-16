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
const createPaymentService = async (payload) => {
    const { cart_id, customer_name, customer_phone, customer_address, customer_email, payableAmount, dueAmount, quantity, } = payload;
    const findCart = (await cart_model_1.Cart.findOne({ _id: cart_id })
        .populate("items.productId")
        .populate("items.lensId")
        .populate("items.contactLensId"));
    const { productId, lensId, contactLensId, subtotal } = findCart?.items[0] || {};
    const deliveryFee = findCart?.deliveryFee;
    const { customerId } = findCart;
    const transectionId = `REF${(0, uuid_1.v4)()}`;
    let productName = "";
    if (productId && lensId) {
        productName = `${productId?.name} + ${lensId?.name}`;
    }
    if (productId && !lensId) {
        productName = productId?.name;
    }
    if (!productId && lensId) {
        productName = lensId?.name;
    }
    if (contactLensId) {
        productName = contactLensId?.name;
    }
    const date = new Date();
    const arrangeDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
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
            const result = `${remainingZeros}${convertIntoNumberAndAddOne}`;
            newBarcode = result;
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
    if (findCart?.items[0]?.productId) {
        const productQty = findCart?.items[0]?.productId?.quantity;
        if (productQty === 0)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "frame-stock-out");
        if (productQty < quantity)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "frame amount you have given out of stock");
    }
    if (findCart?.items[0]?.lensId) {
        const lensQty = findCart?.items[0]?.lensId?.quantity;
        if (lensQty === 0)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "lens-stock-out");
        if (lensQty < quantity)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "lens pair amount you have given out of stock");
    }
    if (findCart?.items[0]?.contactLensId) {
        const contactLensQty = findCart?.items[0]?.contactLensId?.quantity;
        if (contactLensQty === 0)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "contact-lens-stock-out");
        if (contactLensQty < quantity)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "contact lens pair amount you have given out of stock");
    }
    const salesId = (await sale_model_1.Sale.create(salesData))._id;
    console.log(salesId);
    const is_live = false;
    const data = {
        total_amount: payableAmount,
        currency: "BDT",
        tran_id: transectionId, // use unique tran_id for each api call
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
    const sslcz = await new sslcommerz_lts_1.default(config_1.default.store_id, config_1.default.store_pass, is_live);
    const res = await sslcz.init(data).then((apiResponse) => {
        const result = apiResponse.GatewayPageURL;
        return result;
    });
    return await res;
};
const paymentSuccessService = async (salesId) => {
    const findSales = (await sale_model_1.Sale.findOne({ _id: salesId })
        .populate("productId")
        .populate("lensId")
        .populate("contactLensId"));
    if (!findSales)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "sales-not-found");
    if (findSales) {
        await sale_model_1.Sale.findByIdAndUpdate(findSales?._id, { status: "Order receieved" }, { new: true, runValidators: true });
    }
    // for product
    if (findSales?.productId) {
        if (findSales.productId.quantity > 0) {
            const soldQty = findSales.quantity;
            const remainingProductQty = findSales.productId.quantity - soldQty;
            const updateSold = findSales.productId.sold + soldQty;
            if (remainingProductQty === 0) {
                await products_model_1.default.findByIdAndUpdate(findSales?.productId?._id, { quantity: remainingProductQty, sold: updateSold, stock: false }, { new: true, runValidators: true });
            }
            else {
                await products_model_1.default.findByIdAndUpdate(findSales?.productId?._id, { quantity: remainingProductQty, sold: updateSold }, { new: true, runValidators: true });
            }
        }
    }
    // for lens
    if (findSales?.lensId) {
        if (findSales.lensId.quantity > 0) {
            const soldQty = findSales.quantity;
            const remainingLensQty = findSales.lensId.quantity - soldQty;
            const updateSold = findSales.lensId.sold + soldQty;
            if (remainingLensQty === 0) {
                await lenses_model_1.Lens.findByIdAndUpdate(findSales.lensId?._id, { quantity: remainingLensQty, sold: updateSold, stock: false }, { new: true, runValidators: true });
            }
            else {
                await lenses_model_1.Lens.findByIdAndUpdate(findSales.lensId?._id, { quantity: remainingLensQty, sold: updateSold }, { new: true, runValidators: true });
            }
        }
    }
    // for contact lens
    if (findSales?.contactLensId) {
        if (findSales.contactLensId.quantity > 0) {
            const soldQty = findSales.quantity;
            const remainingContactLensQty = findSales.contactLensId.quantity - soldQty;
            const updateSold = findSales.contactLensId.sold + soldQty;
            if (remainingContactLensQty === 0) {
                await contactlens_model_1.default.findByIdAndUpdate(findSales.contactLensId?._id, { quantity: remainingContactLensQty, sold: updateSold, stock: false }, { new: true, runValidators: true });
            }
            else {
                await contactlens_model_1.default.findByIdAndUpdate(findSales.contactLensId?._id, { quantity: remainingContactLensQty, sold: updateSold }, { new: true, runValidators: true });
            }
        }
    }
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
    const result = await paymentHistory_model_1.PaymentHistory.create(paymentHistoryData);
    if (result)
        return "success";
};
const paymentFailService = async (saleId) => {
    const findSaleData = await sale_model_1.Sale.deleteOne({ _id: saleId });
    if (findSaleData.acknowledged)
        return "saleData deleted";
};
const paymentCancelledService = async (saleId) => {
    const findSaleData = await sale_model_1.Sale.deleteOne({ _id: saleId });
    if (findSaleData.acknowledged)
        return "saleData deleted";
};
exports.paymentService = {
    createPaymentService,
    paymentSuccessService,
    paymentFailService,
    paymentCancelledService,
};
//# sourceMappingURL=payment.service.js.map