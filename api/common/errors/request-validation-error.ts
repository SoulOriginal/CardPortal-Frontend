import {ValidationError} from "express-validator";

export class RequestValidationError extends Error {
    resultCode = '3';
    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {

        return this.errors.map(error =>{
            const message = error.msg.messageText
            return {message, field: error.param, errorCode: error.msg.errorCode}
        })
    }
}

