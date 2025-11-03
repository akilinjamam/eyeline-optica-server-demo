"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFilterService = void 0;
const accessory_model_1 = __importDefault(require("../accessory/accessory.model"));
const contactlens_model_1 = __importDefault(require("../contactLens/contactlens.model"));
const lenses_model_1 = require("../lenses/lenses.model");
const products_model_1 = __importDefault(require("../products/products.model"));
const weeklydeals_model_1 = require("../weeklyDeals/weeklydeals.model");
const getSearchItemService = async (search) => {
    const { query } = search;
    const getAccessory = await accessory_model_1.default.find({});
    const modifyAccessory = getAccessory?.map((item) => {
        const name = item?.items?.map((value) => value.name)?.join("+");
        const price = item?.items
            ?.map((value) => value.salesPrice)
            ?.reduce((acc, sum) => acc + sum, 0);
        const brand = item?.items?.map((value) => value.brand)?.join("+");
        return {
            _id: item?._id,
            images: item.images,
            color: "no-color",
            name,
            salesPrice: price,
            brand,
            weeklyDeals: item.weeklyDeals,
            badge: "no-badge",
        };
    });
    //build the search
    const searchFilterForFrame = {};
    const searchFilterForLensAndContactLens = {};
    const searchFilterForAccessory = {};
    if (query) {
        searchFilterForFrame.$or = [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { frameCategory: { $regex: query, $options: "i" } },
            { sizeCategory: { $regex: query, $options: "i" } },
            { shapeCategory: { $regex: query, $options: "i" } },
            { biologyCategory: { $regex: query, $options: "i" } },
            { brand: { $regex: query, $options: "i" } },
        ];
    }
    if (query) {
        searchFilterForLensAndContactLens.$or = [
            { name: { $regex: query, $options: "i" } },
            { brand: { $regex: query, $options: "i" } },
        ];
    }
    if (query) {
        searchFilterForAccessory.$or = [
            { "items.name": { $regex: query, $options: "i" } },
            { "items.brand": { $regex: query, $options: "i" } },
        ];
    }
    const projection = "_id name salesPrice brand weeklyDeals images color badge";
    const [frame, lenses, contactlenses] = await Promise.all([
        products_model_1.default.find(searchFilterForFrame).select(projection),
        lenses_model_1.Lens.find(searchFilterForLensAndContactLens).select(projection),
        contactlens_model_1.default.find(searchFilterForLensAndContactLens).select(projection),
    ]);
    const allItems = [
        ...modifyAccessory.map((item) => ({ ...item, category: "Accessory" })),
        ...frame.map((item) => ({ ...item.toObject(), category: "Frame" })),
        ...lenses.map((item) => ({ ...item.toObject(), category: "Lens" })),
        ...contactlenses.map((item) => ({ ...item.toObject(), category: "Contact Lens" })),
    ];
    return allItems;
};
const updateWeeklyDeals = async (payload, id) => {
    const result = await weeklydeals_model_1.WeeklyDeals.updateOne({ _id: id }, { $set: payload }, { runValidators: true });
    return result;
};
const getWeeklyDeals = async () => {
    const result = await weeklydeals_model_1.WeeklyDeals.find({});
    return result[0];
};
exports.searchFilterService = {
    getSearchItemService,
    updateWeeklyDeals,
    getWeeklyDeals,
};
//# sourceMappingURL=searchFilter.service.js.map