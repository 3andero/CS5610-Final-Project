export class ApiError implements Error {
    name: string;
    message: string;
    stack?: string | undefined;
    status: number;

    constructor(status: number, message: string) {
        this.message = message;
        this.status = status;
        this.name = "APIError";
    }
}

export const logStr = (s: string) => {
    console.log(s);
    return s;
}