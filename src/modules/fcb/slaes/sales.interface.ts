import { Types } from "mongoose";

export type TPaymentMethod = "cash" | "bkash" | "nagad" | "bank" | "card";
export type TPaymentStatus = "paid" | "partial" | "due";

export interface IFcbSaleItem {
	product: Types.ObjectId;
	quantity: number;
	sellingPrice: number;
	costPriceAtSale: number;
	subtotal: number;
}

export interface IFcbSale {
	invoiceNo: string;
	customer?: Types.ObjectId | null;
	items: IFcbSaleItem[];
	subtotalAmount: number;
	discount: number;
	totalAmount: number;
	paidAmount: number;
	dueAmount: number;
	paymentMethod: TPaymentMethod;
	paymentStatus: TPaymentStatus;
	saleDate: Date;
	note?: string;
	isDeleted: boolean;
}

export interface IFcbCreateSaleInput {
	invoiceNo?: string;
	customer?: string | null;
	items: {
		product: string;
		quantity: number;
		sellingPrice: number;
	}[];
	discount?: number;
	paidAmount: number;
	paymentMethod?: TPaymentMethod;
	saleDate?: string | Date;
	note?: string;
}
