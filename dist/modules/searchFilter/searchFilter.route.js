"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchFilter_controller_1 = require("./searchFilter.controller");
const searchRouter = express_1.default.Router();
searchRouter.get("/get-items", searchFilter_controller_1.searchfiltercontroller.getSearchItemsController);
exports.default = searchRouter;
//# sourceMappingURL=searchFilter.route.js.map