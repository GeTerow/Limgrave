export default class HttpErrors {
    private _title: string;
    private _message: string;
    private _statusCode: number;
    constructor(title: string, message: string, statusCode: number) {
        this._title = title; 
        this._message = message;
        this._statusCode = statusCode;
    }
}

export class BadRequest extends HttpErrors {
    constructor(message: string) {
        super("Bad Request", message, 400);
    }
}

export class NotFound extends HttpErrors {
    constructor(message: string) {
        super("Not Found", message, 404);
    }
}