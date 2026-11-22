import { IFcbProduct } from "./product.interface";
import { FcbProduct } from "./product.model";

const createProduct = async (payload: Partial<IFcbProduct>) => {
  return await FcbProduct.create({
    ...payload,
    stockId: null,
    purchasePrice: 0,
    salesPrice: 0,
    stockQuantity: 0,
  });
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = { isDeleted: false };

  if (query.category) {
    filter.category = {
      $regex: `^${String(query.category).trim()}$`,
      $options: "i",
    };
  }

  if (query.searchTerm) {
    filter.$or = [
      { name: { $regex: query.searchTerm, $options: "i" } },
      { slug: { $regex: query.searchTerm, $options: "i" } },
      { sku: { $regex: query.searchTerm, $options: "i" } },
      { category: { $regex: query.searchTerm, $options: "i" } },
    ];
  }

  return await FcbProduct.find(filter)
    .populate(
      "stockId",
      "batchCode purchasePrice salesPrice quantity remainingQuantity createdAt",
    )
    .sort({ createdAt: -1 });
};

const getSingleProduct = async (idOrSlug: string) => {
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
  const query = isObjectId
    ? { _id: idOrSlug, isDeleted: false }
    : { slug: idOrSlug, isDeleted: false };

  const product = await FcbProduct.findOne(query).populate(
    "stockId",
    "batchCode purchasePrice salesPrice quantity remainingQuantity createdAt",
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// const updateProduct = async (id: string, payload: Partial<IFcbProduct>) => {
//   // Prevent overwriting price/stock fields directly from product endpoint; manage via Stock module
//   const {
//     stockId: _stockId,
//     purchasePrice: _purchasePrice,
//     salesPrice: _salesPrice,
//     stockQuantity: _stockQuantity,
//     ...safePayload
//   } = payload;

//   if (safePayload.name && !safePayload.slug) {
//     safePayload.slug = safePayload.name
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, '')
//       .replace(/\s+/g, '-');
//   }

//   const updated = await FcbProduct.findOneAndUpdate(
//     { _id: id, isDeleted: false },
//     safePayload,
//     { new: true, runValidators: true }
//   );

//   if (!updated) {
//     throw new Error('Product not found');
//   }

//   return updated;
// };

const deleteProduct = async (id: string) => {
  const deleted = await FcbProduct.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!deleted) {
    throw new Error("Product not found");
  }

  return deleted;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  // updateProduct,
  deleteProduct,
};
