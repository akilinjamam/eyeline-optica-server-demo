import express from "express";
import { protect } from "../../app/middleware/auth";
import { salescontroller } from "./sale.controller";

const salesRouter = express.Router();

salesRouter.get("/get-sales", protect, salescontroller.getSalescontroller);
salesRouter.get("/get-customer", salescontroller.getCustomercontroller);

export default salesRouter;
