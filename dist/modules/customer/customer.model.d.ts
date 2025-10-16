import mongoose from "mongoose";
import { TCustomer } from "./customer.type";
declare const Customer: mongoose.Model<TCustomer, {}, {}, {}, mongoose.Document<unknown, {}, TCustomer, {}, {}> & TCustomer & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Customer;
//# sourceMappingURL=customer.model.d.ts.map