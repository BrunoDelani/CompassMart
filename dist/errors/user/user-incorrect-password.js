"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserIncorrectPassword {
    constructor() {
        this.message = 'Incorrect password.';
        this.statusCode = 401;
    }
}
exports.default = UserIncorrectPassword;
