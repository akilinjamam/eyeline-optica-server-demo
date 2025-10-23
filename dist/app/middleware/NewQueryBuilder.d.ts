import { Query } from "mongoose";
declare class NewQueryBuilder<T> {
    modelQuery: Query<T[], T>;
    query: Record<string, unknown>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>);
    search(searchableFields: string[]): this;
    filter(): this;
    sort(): this;
    pagination(): this;
    fields(): this;
    countTotal(): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    }>;
}
export default NewQueryBuilder;
//# sourceMappingURL=NewQueryBuilder.d.ts.map