"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agora_controller_1 = require("./agora.controller");
const agoraRouter = express_1.default.Router();
agoraRouter.post("/create-token", agora_controller_1.agoraTokenController.createAgoraTokenController);
exports.default = agoraRouter;
//# sourceMappingURL=agora.route.js.map