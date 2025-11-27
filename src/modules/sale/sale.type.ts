import mongoose from "mongoose";

/* 
customerId: new ObjectId('68efd6a72b90eca368602295'),
  customer_name: 'INJAMAM ISLAM CHOWDHURY',
  customer_phone: '01761174393',
  customer_address: 'chittagong, bangladesh',
  customer_email: 'akilinjamam@gmail.com',
  payableAmount: 5000,
  productId: new ObjectId('68deca221c1d6806e08a84b4'),
  lensId: new ObjectId('68de7abe53ba2fe37b3f2beb'),
  contactLensId: '',
  deliveryFee: 70,
  subtotal: 6200

*/
export type TSale = {
	invoiceNo: string;
	customerId: mongoose.Types.ObjectId;
	customer_name: string;
	customer_phone: string;
	customer_address: string;
	customer_email: string;
	payableAmount: number;
	dueAmount: number;
	productId: mongoose.Types.ObjectId;
	lensId: mongoose.Types.ObjectId;
	contactLensId: mongoose.Types.ObjectId;
	deliveryFee: number;
	subtotal: number;
	frameColorName: string;
	status: "pending" | "Order receieved" | "processsing" | "packaging" | "on the way" | "delivered";
};
