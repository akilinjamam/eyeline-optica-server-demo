export type TCustomerType = "retail" | "wholesale";

export interface IFcbCustomer {
	name: string;
	phone: string;
	email?: string;
	address?: string;
	type: TCustomerType;
	totalDue: number;
	note?: string;
	isActive: boolean;
	isDeleted: boolean;
}
