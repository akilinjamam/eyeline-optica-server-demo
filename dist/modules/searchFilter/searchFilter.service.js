"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFilterService = void 0;
const contactlens_model_1 = __importDefault(require("../contactLens/contactlens.model"));
const lenses_model_1 = require("../lenses/lenses.model");
const products_model_1 = __importDefault(require("../products/products.model"));
const getSearchItemService = async (search) => {
    const { query } = search;
    //build the search
    const searchFilter = {};
    if (query) {
        searchFilter.$or = [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { frameCategory: { $regex: query, $options: "i" } },
            { sizeCategory: { $regex: query, $options: "i" } },
            { shapeCategory: { $regex: query, $options: "i" } },
            { biologyCategory: { $regex: query, $options: "i" } },
            { brand: { $regex: query, $options: "i" } },
        ];
    }
    const projection = "_id name salesPrice brand ";
    const [frame, lenses, contactlenses] = await Promise.all([
        products_model_1.default.find(searchFilter).select(projection),
        lenses_model_1.Lens.find(searchFilter).select(projection),
        contactlens_model_1.default.find(searchFilter).select(projection),
    ]);
    const allItems = [
        ...frame.map((item) => ({ ...item.toObject(), category: "Frame" })),
        ...lenses.map((item) => ({ ...item.toObject(), category: "Lens" })),
        ...contactlenses.map((item) => ({ ...item.toObject(), category: "Contact Lens" })),
    ];
    return allItems;
};
exports.searchFilterService = {
    getSearchItemService,
};
//# sourceMappingURL=searchFilter.service.js.map