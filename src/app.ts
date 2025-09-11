import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRoute from "./app/middleware/notFoundRoute";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173", "https://eyeline-optica-cms.vercel.app"],
		credentials: true,
	})
);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, TypeScript + Express!");
});

app.use("/api/v1/", router);

//not found route
app.use(notFoundRoute);

//global error handler
app.use(globalErrorHandler);

export default app;
