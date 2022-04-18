"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    // @ts-ignore
    function BadRequestError(message, errorCode) {
        var _this = 
        // @ts-ignore
        _super.call(this, message) || this;
        _this.message = message;
        _this.errorCode = errorCode;
        _this.resultCode = '3';
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        return _this;
    }
    BadRequestError.prototype.serializeErrors = function () {
        return { message: this.message, errorCode: this.errorCode };
    };
    return BadRequestError;
}(Error));
exports.BadRequestError = BadRequestError;
