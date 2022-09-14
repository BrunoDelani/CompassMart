"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserEmailExists {
    constructor() {
        this.message = 'This email is already in use.';
        this.statusCode = 400;
    }
}
exports.default = UserEmailExists;
