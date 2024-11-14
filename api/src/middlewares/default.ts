import dotenv from "dotenv";
dotenv.config();
import { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { RunningErrors } from "../errors/InterErrors";
import { ServerError } from "../errors/HttpErrors";

export default function defaultMiddlewares(app: Express): void {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors()) // depois precisamos definir qual o endpoint do APP
    app.use((error: Error, req: Request, res: Response, next: NextFunction): Response => {
        new RunningErrors(defaultMiddlewares, `${error}`);
        const _error = new ServerError("Não foi possível conectar com a API. Tente novamente mais tarde.");
        return res.status(_error.statusCode).json({
            error: _error,
        });
    })
}