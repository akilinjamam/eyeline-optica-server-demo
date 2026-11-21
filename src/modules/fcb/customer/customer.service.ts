import { IFcbCustomer } from "./customer.interface";
import { FcbCustomer } from "./customer.model";

const createCustomer = async (payload: IFcbCustomer) => {
	return await FcbCustomer.create(payload);
};

const getAllCustomers = async (query: Record<string, unknown>) => {
	const filter: Record<string, unknown> = { isDeleted: false };

	if (query.type) {
		filter.type = query.type;
	}

	if (query.isActive !== undefined) {
		filter.isActive = query.isActive === "true";
	}

	if (query.hasDue === "true") {
		filter.totalDue = { $gt: 0 };
	}

	if (query.searchTerm) {
		filter.$or = [
			{ name: { $regex: query.searchTerm, $options: "i" } },
			{ phone: { $regex: query.searchTerm, $options: "i" } },
			{ address: { $regex: query.searchTerm, $options: "i" } },
		];
	}

	return await FcbCustomer.find(filter).sort({ totalDue: -1, createdAt: -1 });
};

const getSingleCustomer = async (id: string) => {
	const customer = await FcbCustomer.findOne({ _id: id, isDeleted: false });
	if (!customer) {
		throw new Error("Customer not found");
	}
	return customer;
};

const updateCustomer = async (id: string, payload: Partial<IFcbCustomer>) => {
	const updated = await FcbCustomer.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
		new: true,
		runValidators: true,
	});

	if (!updated) {
		throw new Error("Customer not found");
	}

	return updated;
};

const deleteCustomer = async (id: string) => {
	const customer = await FcbCustomer.findOne({ _id: id, isDeleted: false });
	if (!customer) {
		throw new Error("Customer not found");
	}

	if (customer.totalDue > 0) {
		throw new Error("Cannot delete a customer with pending due balance");
	}

	const deleted = await FcbCustomer.findOneAndUpdate(
		{ _id: id, isDeleted: false },
		{ isDeleted: true, isActive: false },
		{ new: true }
	);

	return deleted;
};

export const CustomerServices = {
	createCustomer,
	getAllCustomers,
	getSingleCustomer,
	updateCustomer,
	deleteCustomer,
};
