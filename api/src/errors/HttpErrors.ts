export default class HttpErrors {
    public title: string;
    public message: string;
    public statusCode: number;
    constructor(title: string, message: string, statusCode: number) {
        this.title = title; 
        this.message = message;
        this.statusCode = statusCode;
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

export class ServerError extends HttpErrors {
    constructor(message: string) {
        super("Server Error", message, 500);
    }
}