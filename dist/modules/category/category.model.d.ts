import mongoose, { Document } from "mongoose";
export interface ICategory extends Document {
    categoryType: string;
    category: string;
}
export declare const Category: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=category.model.d.ts.map