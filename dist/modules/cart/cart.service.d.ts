import { ICart } from "./cart.model";
import mongoose from "mongoose";
export declare const createCartService: (payload: ICart) => Promise<{
    token: string;
}>;
export declare const cartService: {
    createCartService: (payload: ICart) => Promise<{
        token: string;
    }>;
    createCartWithPrescriptionImg: (payload: any) => Promise<{
        token: string;
    }>;
    getCartService: (phoneNumber: string) => Promise<(mongoose.Document<unknown, {}, ICart, {}, {}> & ICart & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=cart.service.d.ts.map