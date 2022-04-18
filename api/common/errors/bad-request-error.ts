export class BadRequestError extends Error {
    resultCode = '3'
    // @ts-ignore
    constructor(public message, public errorCode) {
        // @ts-ignore
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
    serializeErrors() {
        return {message: this.message, errorCode: this.errorCode}
    }
}
