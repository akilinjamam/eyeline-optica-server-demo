import { IWishList } from "./wishlist.model";
export declare const wwishListService: {
    createWishListService: (payload: IWishList) => Promise<string>;
    getAllWishlistAccordingToType: (type: string) => Promise<(import("mongoose").Document<unknown, {}, IWishList, {}, {}> & IWishList & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=wishlist.service.d.ts.map