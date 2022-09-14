"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoToken {
    constructor() {
        this.message = 'No token provided.';
        this.statusCode = 401;
    }
}
exports.default = new NoToken();
