import express from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { metaSchema } from "./metadata.validation";
import { MetaController } from "./metadata.controller";

const metaRoute = express.Router();

metaRoute.post("/create-meta", validateRequest(metaSchema), MetaController.createMetaController);

metaRoute.get("/", MetaController.getAllMetaController);
metaRoute.put("/update-meta/:id", MetaController.updateMetaController);
metaRoute.delete("/delete-meta/:id", MetaController.deleteMetaController);
metaRoute.get("/get-meta-by-id/:id", MetaController.getSingleMetaController);

export default metaRoute;
