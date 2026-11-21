export interface IFcbSupplier {
	name: string;
	companyName?: string;
	phone: string;
	email?: string;
	address?: string;
	totalDue: number;
	isActive: boolean;
	isDeleted: boolean;
}
