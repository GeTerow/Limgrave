declare global {
    interface QueryResult {
        rows: any[];
        rowCount: number;
    }
}
export {}