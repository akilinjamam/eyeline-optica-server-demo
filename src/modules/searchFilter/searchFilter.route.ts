import express from "express";
import { searchfiltercontroller } from "./searchFilter.controller";

const searchRouter = express.Router();

searchRouter.get("/get-items", searchfiltercontroller.getSearchItemsController);
searchRouter.put("/update-deals/:id", searchfiltercontroller.updateWeeklyDealsController);
searchRouter.get("/get-deals", searchfiltercontroller.getWeeklyDealsController);

export default searchRouter;
