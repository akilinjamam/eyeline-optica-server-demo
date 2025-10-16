"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    cloude_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    jwt_secret: process.env.JWT_SECRET,
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASSWORD,
};
//# sourceMappingURL=index.js.map