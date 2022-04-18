export class NotAuthorizedError extends Error {
    resultCode = '5'
    constructor() {
        super();

        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors() {
        return {message: 'Not authorized', errorCode: "5"};
    }

}
