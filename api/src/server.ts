import dotenv from "dotenv"
dotenv.config();
import express, { Express } from "express";
import { RunningErrors } from "./errors/InterErrors";

const app: Express = express();

if (!process.env.PORT) {
    let error = new Error("ENV_PORT_UNDEFINED");
    throw new RunningErrors(app, error);
}
const PORT: string = process.env.PORT;

app.listen(PORT, (): void => console.log("API is running on PORT:", PORT));