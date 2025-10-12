"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactLensController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const contactlens_service_1 = require("./contactlens.service");
const createContactLensController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await contactlens_service_1.contactLensService.createContactLensService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "all Contact Lense created successfully",
        data: result,
    });
});
const getAllContactLenseController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await contactlens_service_1.contactLensService.getAllContactLenseService(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "all contact Lense found successfully",
        data: result,
    });
});
const getSingleContactLenseController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await contactlens_service_1.contactLensService.getSingleContactLensService(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "contact Lense id found successfully",
        data: result,
    });
});
const updateContactLensController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await contactlens_service_1.contactLensService.updateContactLensService(req.body, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Contact Lens updated successfully",
        data: result,
    });
});
const deleteContactLensController = (0, catchAsync_1.default)(async (req, res) => {
    const { ids } = req.body;
    const result = await contactlens_service_1.contactLensService.deleteContactLensService(ids);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Contact Lens deleted successfully",
        data: result,
    });
});
exports.contactLensController = {
    createContactLensController,
    getAllContactLenseController,
    getSingleContactLenseController,
    updateContactLensController,
    deleteContactLensController,
};
//# sourceMappingURL=contactlens.controller.js.map