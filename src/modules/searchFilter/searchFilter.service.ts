import ContactLens from "../contactLens/contactlens.model";
import { Lens } from "../lenses/lenses.model";
import Product from "../products/products.model";

interface SearchFilter {
	$or?: { [key: string]: any }[];
}

const getSearchItemService = async (search: Record<string, unknown>) => {
	const { query } = search;

	//build the search
	const searchFilter: SearchFilter = {};

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
		Product.find(searchFilter).select(projection),
		Lens.find(searchFilter).select(projection),
		ContactLens.find(searchFilter).select(projection),
	]);

	const allItems = [
		...frame.map((item) => ({ ...item.toObject(), category: "Frame" })),
		...lenses.map((item) => ({ ...item.toObject(), category: "Lens" })),
		...contactlenses.map((item) => ({ ...item.toObject(), category: "Contact Lens" })),
	];

	return allItems;
};

export const searchFilterService = {
	getSearchItemService,
};
