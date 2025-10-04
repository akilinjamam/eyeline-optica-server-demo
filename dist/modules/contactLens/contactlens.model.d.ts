import mongoose from "mongoose";
import { IContactLens } from "./contactlens.type";
declare const ContactLens: mongoose.Model<IContactLens, {}, {}, {}, mongoose.Document<unknown, {}, IContactLens, {}, {}> & IContactLens & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default ContactLens;
//# sourceMappingURL=contactlens.model.d.ts.map