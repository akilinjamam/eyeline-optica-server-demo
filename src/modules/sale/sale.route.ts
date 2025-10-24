import express from "express";
import { protect } from "../../app/middleware/auth";
import { salescontroller } from "./sale.controller";

const salesRouter = express.Router();

salesRouter.get("/get-sales", protect, salescontroller.getSalescontroller);
salesRouter.get("/get-customer", salescontroller.getCustomercontroller);
salesRouter.patch("/update-status/:id", salescontroller.updateStatuscontroller);

export default salesRouter;
