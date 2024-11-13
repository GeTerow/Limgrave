import dotenv from "dotenv"
dotenv.config();
import express, { Express } from "express";

const app: Express = express();

if (!process.env.PORT) {
    throw new Error("Nenhuma porta definida no arquivo de configuração de variáveis");
}
const PORT: string = process.env.PORT;

app.listen(PORT, (): void => console.log("API is running on PORT:", PORT));