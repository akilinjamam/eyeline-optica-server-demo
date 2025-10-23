"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NewQueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
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
        const startDate = this.query.startDate ? new Date(this.query.startDate) : null;
        const endDate = this.query.endDate ? new Date(this.query.endDate) : null;
        if (startDate && endDate) {
            dateFilter = { createdAt: { $gte: startDate, $lte: endDate } };
        }
        else {
            dateFilter = { createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } };
        }
        this.modelQuery = this.modelQuery.find({ ...queryObj, ...dateFilter });
        return this;
    }
    sort() {
        const sort = this?.query?.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
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
        const fields = this?.query?.fields?.split(",")?.join(" ") || "-__v";
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
exports.default = NewQueryBuilder;
//# sourceMappingURL=NewQueryBuilder.js.map