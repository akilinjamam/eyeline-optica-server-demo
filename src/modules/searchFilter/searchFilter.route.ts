import express from "express";
import { searchfiltercontroller } from "./searchFilter.controller";

const searchRouter = express.Router();

searchRouter.get("/get-items", searchfiltercontroller.getSearchItemsController);

export default searchRouter;
