import { FilterQuery, Query } from "mongoose";

class NewQueryBuilder<T> {
	public modelQuery: Query<T[], T>;
	public query: Record<string, unknown>;
	constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
		this.modelQuery = modelQuery;
		this.query = query;
	}

	search(searchableFields: string[]) {
		const searchTerm = this?.query?.searchTerm;
		if (searchTerm) {
			this.modelQuery = this.modelQuery.find({
				$or: searchableFields.map(
					(field) =>
						({
							[field]: { $regex: searchTerm, $options: "i" },
						}) as FilterQuery<T>
				),
			});
		}

		return this;
	}

	filter() {
		const queryObj = { ...this.query }; //copy

		// filtering
		const excludeFields = ["searchTerm", "sort", "limit", "page", "fields", "startDate", "endDate"];

		excludeFields.forEach((el) => delete queryObj[el]);

		const currentDate = new Date();
		const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
		const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

		let dateFilter = {};
		const startDate = this.query.startDate ? new Date(this.query.startDate as string) : null;
		const endDate = this.query.endDate ? new Date(this.query.endDate as string) : null;

		if (startDate && endDate) {
			dateFilter = { createdAt: { $gte: startDate, $lte: endDate } };
		} else {
			dateFilter = { createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } };
		}

		this.modelQuery = this.modelQuery.find({ ...queryObj, ...dateFilter } as FilterQuery<T>);

		return this;
	}

	sort() {
		const sort = this?.query?.sort || "-createdAt";
		this.modelQuery = this.modelQuery.sort(sort as string);

		return this;
	}

	pagination() {
		const page = Number(this?.query?.page) || 0;
		const limit = Number(this?.query?.limit) || 0;
		const skip = (page - 1) * limit;

		this.modelQuery = this.modelQuery.skip(skip).limit(limit);

		return this;
	}

	fields() {
		const fields = (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";
		this.modelQuery = this.modelQuery.select(fields);
		return this;
	}

	async countTotal() {
		const totalQueries = this.modelQuery.getFilter();
		const total = await this.modelQuery.model.countDocuments(totalQueries);
		const page = Number(this?.query?.page) || 1;
		const limit = Number(this?.query?.limit) || 10;
		const totalPage = Math.ceil(total / limit);

		return {
			page,
			limit,
			total,
			totalPage,
		};
	}
}

export default NewQueryBuilder;
