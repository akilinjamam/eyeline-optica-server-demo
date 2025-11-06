import Accessory, { IAccessory, IAccessoryItems } from "../accessory/accessory.model";
import ContactLens from "../contactLens/contactlens.model";
import { Lens } from "../lenses/lenses.model";
import Product from "../products/products.model";
import { IWeeklyDeals, WeeklyDeals } from "../weeklyDeals/weeklydeals.model";

interface SearchFilter {
	$or?: { [key: string]: any }[];
}

const getSearchItemService = async (search: Record<string, unknown>) => {
	const { query } = search;

	const getAccessory = await Accessory.find({});

	const modifyAccessory = getAccessory?.map((item: IAccessory) => {
		const name = item?.items?.map((value: IAccessoryItems) => value.name)?.join("+");
		const price = item?.items
			?.map((value: IAccessoryItems) => value.salesPrice)
			?.reduce((acc: number, sum: number) => acc + sum, 0);
		const brand = item?.items?.map((value: IAccessoryItems) => value.brand)?.join("+");

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
	const searchFilterForFrame: SearchFilter = {};
	const searchFilterForLensAndContactLens: SearchFilter = {};

	const searchFilterForAccessory: SearchFilter = {};

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
		Product.find(searchFilterForFrame).select(projection),
		Lens.find(searchFilterForLensAndContactLens).select(projection),
		ContactLens.find(searchFilterForLensAndContactLens).select(projection),
	]);

	const allItems = [
		...frame.map((item) => ({ ...item.toObject(), category: "Frame" })),
		...lenses.map((item) => ({ ...item.toObject(), category: "Lens" })),
		...contactlenses.map((item) => ({ ...item.toObject(), category: "Contact Lens" })),
		...modifyAccessory.map((item) => ({ ...item, category: "Accessory" })),
	];

	return allItems;
};

const updateWeeklyDeals = async (payload: IWeeklyDeals, id: string) => {
	const result = await WeeklyDeals.updateOne(
		{ _id: id },
		{ $set: payload },
		{ runValidators: true }
	);

	return result;
};
const getWeeklyDeals = async () => {
	const result = await WeeklyDeals.find({});
	return result[0];
};

export const searchFilterService = {
	getSearchItemService,
	updateWeeklyDeals,
	getWeeklyDeals,
};
