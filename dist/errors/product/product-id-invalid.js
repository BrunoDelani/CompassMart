"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductIdInvalid {
    constructor() {
        this.message = 'Product Id is invalid.';
        this.statusCode = 400;
    }
}
exports.default = ProductIdInvalid;
