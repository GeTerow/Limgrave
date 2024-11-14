import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
import { DatabaseErrors } from "../errors/InterErrors";
import { RunningErrors } from "../errors/InterErrors";

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME) {
    throw new RunningErrors(execute,"ENV_DB_VARIABLES_UNDEFINED");
}

const pool: Pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    max: 15,
    idleTimeoutMillis: 2000,
    connectionTimeoutMillis: 3000
});

export default async function execute(query: string, params?: any[]): Promise<QueryResult | DatabaseErrors> {
    const client = await pool.connect();
    try {
        const result = await client.query(query, params);
        return {
            rows: result.rows,
            rowCount: result.rowCount ?? 0,
        }
    } catch (error) {
        const _error = new DatabaseErrors(execute, `${error}`, query, params);
        return _error;       
    } finally {
        client.release();
    }
}