import { Document } from "mongoose";
export interface IBanner extends Document {
    category: string;
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
declare const Banner: import("mongoose").Model<IBanner, {}, {}, {}, Document<unknown, {}, IBanner, {}, {}> & IBanner & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Banner;
//# sourceMappingURL=banner.model.d.ts.map