import { Schema, model } from "mongoose";
import { IFcbProduct } from "./product.interface";

const productSchema = new Schema<IFcbProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    sku: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    unit: { type: String, enum: ["piece", "meter", "yard"], default: "piece" },
    images: { type: [String], default: [] },
    stockId: { type: Schema.Types.ObjectId, ref: "Stock", default: null },
    purchasePrice: { type: Number, required: true, default: 0, min: 0 },
    salesPrice: { type: Number, required: true, default: 0, min: 0 },
    stockQuantity: { type: Number, required: true, default: 0, min: 0 },
    lowStockAlert: { type: Number, default: 5, min: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

productSchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

export const FcbProduct = model<IFcbProduct>("FcbProduct", productSchema);
