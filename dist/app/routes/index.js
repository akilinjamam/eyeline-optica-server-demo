"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("../../modules/products/products.route"));
const lenses_route_1 = __importDefault(require("../../modules/lenses/lenses.route"));
const cart_route_1 = __importDefault(require("../../modules/cart/cart.route"));
const contactlens_route_1 = __importDefault(require("../../modules/contactLens/contactlens.route"));
const registration_route_1 = __importDefault(require("../../modules/registration/registration.route"));
const doctor_route_1 = __importDefault(require("../../modules/doctor/doctor.route"));
const schedule_route_1 = __importDefault(require("../../modules/schedule/schedule.route"));
const prescription_route_1 = __importDefault(require("../../modules/prescription/prescription.route"));
const customerLogin_route_1 = __importDefault(require("../../modules/customerLogin/customerLogin.route"));
const payment_route_1 = __importDefault(require("../../modules/payment/payment.route"));
const accessory_route_1 = __importDefault(require("../../modules/accessory/accessory.route"));
const searchFilter_route_1 = __importDefault(require("../../modules/searchFilter/searchFilter.route"));
const paymentHistory_route_1 = __importDefault(require("../../modules/paymentHistory/paymentHistory.route"));
const sale_route_1 = __importDefault(require("../../modules/sale/sale.route"));
const category_route_1 = __importDefault(require("../../modules/category/category.route"));
const blog_route_1 = __importDefault(require("../../modules/blog/blog.route"));
const banner_route_1 = __importDefault(require("../../modules/banner/banner.route"));
const paymentAppointment_route_1 = __importDefault(require("../../modules/payment-appointment/paymentAppointment.route"));
const agora_route_1 = __importDefault(require("../../modules/agora/agora.route"));
const wishlist_route_1 = __importDefault(require("../../modules/wishlist/wishlist.route"));
const router = express_1.default.Router();
const allRoutes = [
    {
        path: "/products",
        route: products_route_1.default,
    },
    {
        path: "/lens",
        route: lenses_route_1.default,
    },
    {
        path: "/cart",
        route: cart_route_1.default,
    },
    {
        path: "/contact-lens",
        route: contactlens_route_1.default,
    },
    {
        path: "/registration",
        route: registration_route_1.default,
    },
    {
        path: "/doctors",
        route: doctor_route_1.default,
    },
    {
        path: "/schedule",
        route: schedule_route_1.default,
    },
    {
        path: "/prescription",
        route: prescription_route_1.default,
    },
    {
        path: "/login",
        route: customerLogin_route_1.default,
    },
    {
        path: "/ssl",
        route: payment_route_1.default,
    },
    {
        path: "/ssl-appointment",
        route: paymentAppointment_route_1.default,
    },
    {
        path: "/accessory",
        route: accessory_route_1.default,
    },
    {
        path: "/search",
        route: searchFilter_route_1.default,
    },
    {
        path: "/payment-history",
        route: paymentHistory_route_1.default,
    },
    {
        path: "/sales",
        route: sale_route_1.default,
    },
    {
        path: "/category",
        route: category_route_1.default,
    },
    {
        path: "/blog",
        route: blog_route_1.default,
    },
    {
        path: "/banner",
        route: banner_route_1.default,
    },
    {
        path: "/agora",
        route: agora_route_1.default,
    },
    {
        path: "/wishlist",
        route: wishlist_route_1.default,
    },
];
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map