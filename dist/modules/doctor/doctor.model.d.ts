import mongoose from "mongoose";
import { IDoctor, IReview } from "./doctor.types";
export declare const Review: mongoose.Model<IReview, {}, {}, {}, mongoose.Document<unknown, {}, IReview, {}, mongoose.DefaultSchemaOptions> & IReview & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<IReview, mongoose.Model<IReview, any, any, any, mongoose.Document<unknown, any, IReview, any, {}> & IReview & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IReview, mongoose.Document<unknown, {}, mongoose.FlatRecord<IReview>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<IReview> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const Doctor: mongoose.Model<IDoctor, {}, {}, {}, mongoose.Document<unknown, {}, IDoctor, {}, mongoose.DefaultSchemaOptions> & IDoctor & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<IDoctor, mongoose.Model<IDoctor, any, any, any, mongoose.Document<unknown, any, IDoctor, any, {}> & IDoctor & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IDoctor, mongoose.Document<unknown, {}, mongoose.FlatRecord<IDoctor>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<IDoctor> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=doctor.model.d.ts.map