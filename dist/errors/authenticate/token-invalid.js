"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidToken {
    constructor() {
        this.message = 'Invalid token.';
        this.statusCode = 401;
    }
}
exports.default = new InvalidToken();
