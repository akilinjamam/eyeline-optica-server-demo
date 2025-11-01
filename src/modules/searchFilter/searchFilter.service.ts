import Accessory, { IAccessory, IAccessoryItems } from "../accessory/accessory.model";
import ContactLens from "../contactLens/contactlens.model";
import { Lens } from "../lenses/lenses.model";
import Product from "../products/products.model";

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
			name,
			salesPrice: price,
			brand,
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

	const projection = "_id name salesPrice brand ";
	const [frame, lenses, contactlenses] = await Promise.all([
		Product.find(searchFilterForFrame).select(projection),
		Lens.find(searchFilterForLensAndContactLens).select(projection),
		ContactLens.find(searchFilterForLensAndContactLens).select(projection),
	]);

	const allItems = [
		...modifyAccessory.map((item) => ({ ...item, category: "Accessory" })),
		...frame.map((item) => ({ ...item.toObject(), category: "Frame" })),
		...lenses.map((item) => ({ ...item.toObject(), category: "Lens" })),
		...contactlenses.map((item) => ({ ...item.toObject(), category: "Contact Lens" })),
	];

	return allItems;
};

export const searchFilterService = {
	getSearchItemService,
};
