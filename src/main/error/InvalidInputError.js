export default class InvalidInputError extends Error {
    constructor(code, message) {
        super(message);
        this.name = this.constructor.name;
        this.status = code;
        Error.captureStackTrace(this, this.constructor);
    }
}