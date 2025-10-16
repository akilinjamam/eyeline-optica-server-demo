import config from "../../app/config";
import { Cart, ICart } from "../cart/cart.model";
import { Sale } from "../sale/sale.model";
import { TPaymentData } from "./payment.type";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";
const createPaymentService = async (payload: TPaymentData) => {
	const {
		cart_id,
		customer_name,
		customer_phone,
		customer_address,
		customer_email,
		payableAmount,
		dueAmount,
	} = payload;

	const findCart = await Cart.findOne({ _id: cart_id })
		.populate("items.productId")
		.populate("items.lensId")
		.populate("items.contactLensId");

	const { productId, lensId, contactLensId, subtotal } = findCart?.items[0] || ({} as any);
	const deliveryFee = findCart?.deliveryFee;
	const { customerId } = findCart as ICart;

	const transectionId = `REF${uuidv4()}`;
	let productName = "";

	if (productId && lensId) {
		productName = `${productId?.name} + ${lensId?.name}`;
	}
	if (productId && !lensId) {
		productName = productId?.name;
	}
	if (!productId && lensId) {
		productName = lensId?.name;
	}
	if (contactLensId) {
		productName = contactLensId?.name;
	}

	const date = new Date();
	const arrangeDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

	const getLastSales = await Sale.findOne().sort({ createdAt: -1 });

	const lastInvoice = getLastSales?.invoiceNo?.slice(8);

	let newBarcode;

	if (lastInvoice === "99999") {
		newBarcode = "00001";
	} else {
		if (getLastSales) {
			const zeros = "00000";
			const zerosLength = zeros?.length;
			const convertIntoNumberAndAddOne = Number(lastInvoice) + 1;
			const barcodeNumberLength = convertIntoNumberAndAddOne?.toString()?.length;
			const remainingZerosLength = zerosLength - barcodeNumberLength;
			const remainingZeros = zeros?.slice(0, remainingZerosLength);

			const result = `${remainingZeros}${convertIntoNumberAndAddOne}`;
			newBarcode = result;
		} else {
			newBarcode = "00001";
		}
	}

	const salesData = {
		invoiceNo: `${arrangeDate}${newBarcode}`,
		tran_id: transectionId,
		customerId,
		customer_name,
		customer_phone,
		customer_address,
		customer_email,
		payableAmount,
		dueAmount,
		productId: productId?._id,
		lensId: lensId?._id,
		contactLensId: contactLensId?._id,
		deliveryFee,
		subtotal,
	};

	const salesId = (await Sale.create(salesData))._id;

	console.log(salesId);

	const is_live = false;

	const data = {
		total_amount: payableAmount,
		currency: "BDT",
		tran_id: transectionId, // use unique tran_id for each api call
		success_url: `http://localhost:5000/api/v1/ssl/payment-success?salesId=${salesId}`,
		fail_url: "http://localhost:5000/api/v1/ssl/fail",
		cancel_url: "http://localhost:5000/api/v1/cancel",
		ipn_url: "http://localhost:3030/ipn",
		shipping_method: "Courier",
		product_name: productName,
		product_category: "Optical",
		product_profile: "general",
		cus_name: customer_name,
		cus_email: customer_email,
		cus_add1: customer_address,
		cus_add2: customer_address,
		cus_city: customer_address,
		cus_state: customer_address,
		cus_postcode: "4000",
		cus_country: "Bangladesh",
		cus_phone: customer_phone,
		cus_fax: customer_phone,
		ship_name: customer_name,
		ship_add1: customer_address,
		ship_add2: customer_address,
		ship_city: customer_address,
		ship_state: customer_address,
		ship_postcode: 4000,
		ship_country: "Bangladesh",
	};

	const sslcz = await new SSLCommerzPayment(config.store_id, config.store_pass, is_live);

	const res = await sslcz.init(data).then((apiResponse: any) => {
		const result = apiResponse.GatewayPageURL;
		return result;
	});

	return await res;
};

const paymentSuccessService = async (salesId: string) => {
	return salesId;
};

export const paymentService = {
	createPaymentService,
	paymentSuccessService,
};
