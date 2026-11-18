import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRoute from "./app/middleware/notFoundRoute";
import router from "./app/routes";

const app: Application = express();
// Tell Express to trust headers forwarded by Nginx or Cloudflare
app.set("trust proxy", true);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://eyelineoptica.com",
			"https://www.eyelineoptica.com",
			"http://www.eyelineoptica.com",
			"http://eyelineoptica.com",
			"https://cms.eyelineoptica.com",
			"http://cms.eyelineoptica.com",
			"https://www.cms.eyelineoptica.com",
			"http://localhost:3000",
		],
	})
);

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({
		status: true,
		message: "Hello, TypeScript + Express + MONGOOSE",
	});
});

app.use("/api/v1/", router);

//not found route
app.use(notFoundRoute);

//global error handler
app.use(globalErrorHandler);

export default app;
