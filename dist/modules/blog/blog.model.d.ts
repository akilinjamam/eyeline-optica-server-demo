import mongoose, { Document } from "mongoose";
export interface IBlog extends Document {
    title: string;
    images: string;
    category: string;
    description: string;
}
export declare const Blog: mongoose.Model<IBlog, {}, {}, {}, mongoose.Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=blog.model.d.ts.map