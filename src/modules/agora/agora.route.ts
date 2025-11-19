import express from "express";
import { agoraTokenController } from "./agora.controller";

const agoraRouter = express.Router();

agoraRouter.post("/create-token", agoraTokenController.createAgoraTokenController);

export default agoraRouter;
