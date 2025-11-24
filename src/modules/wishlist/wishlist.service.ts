import { IWishList, WishList } from "./wishlist.model";

const createWishListService = async (payload: IWishList) => {
	let newResult = "";
	if (payload?.frameId) {
		const findFrameWish = await WishList.findOne({ frameId: payload?.frameId });

		if (!findFrameWish?._id) {
			const result = await WishList.create({ ...payload, productType: "frame" });
			if (result) return (newResult = "frame wish list added");
		}
		if (findFrameWish?._id) {
			const updatedClick = findFrameWish.clicked ? findFrameWish.clicked + 1 : 1;
			const res = await WishList.findByIdAndUpdate(
				findFrameWish?._id,
				{ $set: { clicked: updatedClick } },
				{ new: true, runValidators: true }
			);
			if (res) return (newResult = "frame wish list updated");
		}
	}
	if (payload?.lensId) {
		const findLensWish = await WishList.findOne({ lensId: payload?.lensId });
		if (!findLensWish) {
			const result = await WishList.create({ ...payload, productType: "lens" });
			if (result) return (newResult = "lens wish list added");
		} else {
			const updatedClick = findLensWish.clicked ? findLensWish.clicked + 1 : 1;
			const res = await WishList.findByIdAndUpdate(
				findLensWish?._id,
				{ $set: { clicked: updatedClick } },
				{ new: true, runValidators: true }
			);
			if (res) return (newResult = "lens wish list updated");
		}
	}
	if (payload?.contactLensId) {
		const findCLensWish = await WishList.findOne({ contactLensId: payload?.contactLensId });
		if (!findCLensWish) {
			const result = await WishList.create({ ...payload, productType: "contactLens" });
			if (result) return (newResult = "contact lens wish list added");
		} else {
			const updatedClick = findCLensWish.clicked ? findCLensWish.clicked + 1 : 1;
			const res = await WishList.findByIdAndUpdate(
				findCLensWish?._id,
				{ $set: { clicked: updatedClick } },
				{ new: true, runValidators: true }
			);
			if (res) return (newResult = "contact lens wish list updated");
		}
	}
	if (payload?.accessoryId) {
		const findAccessoryWish = await WishList.findOne({ accessoryId: payload?.accessoryId });
		if (!findAccessoryWish) {
			const result = await WishList.create(payload);
			if (result) return (newResult = "accessory wish list added");
		} else {
			const updatedClick = findAccessoryWish.clicked ? findAccessoryWish.clicked + 1 : 1;
			const res = await WishList.findByIdAndUpdate(
				findAccessoryWish?._id,
				{ $set: { clicked: updatedClick } },
				{ new: true, runValidators: true }
			);
			if (res) return (newResult = "accessory wish list updated");
		}
	}

	return newResult;
};

const getAllWishlistAccordingToType = async (type: string) => {
	const result = await WishList.find({ productType: type });
	return result;
};

export const wwishListService = {
	createWishListService,
	getAllWishlistAccordingToType,
};
