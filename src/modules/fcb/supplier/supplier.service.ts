import { IFcbSupplier } from "./supplier.interface";
import { FcbSupplier } from "./supplier.model";

const createSupplier = async (payload: IFcbSupplier) => {
	return await FcbSupplier.create(payload);
};

const getAllSuppliers = async (query: Record<string, unknown>) => {
	const filter: Record<string, unknown> = { isDeleted: false };

	if (query.isActive !== undefined) {
		filter.isActive = query.isActive === "true";
	}

	if (query.hasDue === "true") {
		filter.totalDue = { $gt: 0 };
	}

	if (query.searchTerm) {
		filter.$or = [
			{ name: { $regex: query.searchTerm, $options: "i" } },
			{ companyName: { $regex: query.searchTerm, $options: "i" } },
			{ phone: { $regex: query.searchTerm, $options: "i" } },
			{ address: { $regex: query.searchTerm, $options: "i" } },
		];
	}

	return await FcbSupplier.find(filter).sort({ createdAt: -1 });
};

const getSingleSupplier = async (id: string) => {
	const supplier = await FcbSupplier.findOne({ _id: id, isDeleted: false });
	if (!supplier) {
		throw new Error("Supplier not found");
	}
	return supplier;
};

const updateSupplier = async (id: string, payload: Partial<IFcbSupplier>) => {
	const updated = await FcbSupplier.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
		new: true,
		runValidators: true,
	});

	if (!updated) {
		throw new Error("Supplier not found");
	}

	return updated;
};

const deleteSupplier = async (id: string) => {
	const supplier = await FcbSupplier.findOne({ _id: id, isDeleted: false });
	if (!supplier) {
		throw new Error("Supplier not found");
	}

	if (supplier.totalDue > 0) {
		throw new Error("Cannot delete a supplier with pending due balance");
	}

	const deleted = await FcbSupplier.findOneAndUpdate(
		{ _id: id, isDeleted: false },
		{ isDeleted: true, isActive: false },
		{ new: true }
	);

	return deleted;
};

export const SupplierServices = {
	createSupplier,
	getAllSuppliers,
	getSingleSupplier,
	updateSupplier,
	deleteSupplier,
};
