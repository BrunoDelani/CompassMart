"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenMalformatted {
    constructor() {
        this.message = 'Token malformatted.';
        this.statusCode = 401;
    }
}
exports.default = new TokenMalformatted();
