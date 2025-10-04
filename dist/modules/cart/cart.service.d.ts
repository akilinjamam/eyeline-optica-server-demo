import { ICart } from "./cart.types";
import mongoose from "mongoose";
export declare const cartService: {
    createCartService: (payload: ICart) => Promise<(mongoose.Document<unknown, {}, ICart, {}, {}> & ICart & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getCartService: () => Promise<(mongoose.Document<unknown, {}, ICart, {}, {}> & ICart & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=cart.service.d.ts.map