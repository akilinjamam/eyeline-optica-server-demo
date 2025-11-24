"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wwishListService = void 0;
const wishlist_model_1 = require("./wishlist.model");
const createWishListService = async (payload) => {
    let newResult = "";
    if (payload?.frameId) {
        const findFrameWish = await wishlist_model_1.WishList.findOne({ frameId: payload?.frameId });
        if (!findFrameWish?._id) {
            const result = await wishlist_model_1.WishList.create({ ...payload, productType: "frame" });
            if (result)
                return (newResult = "frame wish list added");
        }
        if (findFrameWish?._id) {
            const updatedClick = findFrameWish.clicked ? findFrameWish.clicked + 1 : 1;
            const res = await wishlist_model_1.WishList.findByIdAndUpdate(findFrameWish?._id, { $set: { clicked: updatedClick } }, { new: true, runValidators: true });
            if (res)
                return (newResult = "frame wish list updated");
        }
    }
    if (payload?.lensId) {
        const findLensWish = await wishlist_model_1.WishList.findOne({ lensId: payload?.lensId });
        if (!findLensWish) {
            const result = await wishlist_model_1.WishList.create({ ...payload, productType: "lens" });
            if (result)
                return (newResult = "lens wish list added");
        }
        else {
            const updatedClick = findLensWish.clicked ? findLensWish.clicked + 1 : 1;
            const res = await wishlist_model_1.WishList.findByIdAndUpdate(findLensWish?._id, { $set: { clicked: updatedClick } }, { new: true, runValidators: true });
            if (res)
                return (newResult = "lens wish list updated");
        }
    }
    if (payload?.contactLensId) {
        const findCLensWish = await wishlist_model_1.WishList.findOne({ contactLensId: payload?.contactLensId });
        if (!findCLensWish) {
            const result = await wishlist_model_1.WishList.create({ ...payload, productType: "contactLens" });
            if (result)
                return (newResult = "contact lens wish list added");
        }
        else {
            const updatedClick = findCLensWish.clicked ? findCLensWish.clicked + 1 : 1;
            const res = await wishlist_model_1.WishList.findByIdAndUpdate(findCLensWish?._id, { $set: { clicked: updatedClick } }, { new: true, runValidators: true });
            if (res)
                return (newResult = "contact lens wish list updated");
        }
    }
    if (payload?.accessoryId) {
        const findAccessoryWish = await wishlist_model_1.WishList.findOne({ accessoryId: payload?.accessoryId });
        if (!findAccessoryWish) {
            const result = await wishlist_model_1.WishList.create(payload);
            if (result)
                return (newResult = "accessory wish list added");
        }
        else {
            const updatedClick = findAccessoryWish.clicked ? findAccessoryWish.clicked + 1 : 1;
            const res = await wishlist_model_1.WishList.findByIdAndUpdate(findAccessoryWish?._id, { $set: { clicked: updatedClick } }, { new: true, runValidators: true });
            if (res)
                return (newResult = "accessory wish list updated");
        }
    }
    return newResult;
};
const getAllWishlistAccordingToType = async (type) => {
    const result = await wishlist_model_1.WishList.find({ productType: type });
    return result;
};
exports.wwishListService = {
    createWishListService,
    getAllWishlistAccordingToType,
};
//# sourceMappingURL=wishlist.service.js.map