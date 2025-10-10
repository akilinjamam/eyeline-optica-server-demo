import { ICart } from "./cart.types";
export declare const cartService: {
    createCartService: (payload: ICart) => Promise<{
        token: string;
    }>;
    getCartService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("./cart.model").ICart, {}, {}> & import("./cart.model").ICart & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=cart.service.d.ts.map