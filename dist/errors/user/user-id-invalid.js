"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserIdInvalid {
    constructor() {
        this.message = 'User Id is invalid.';
        this.statusCode = 400;
    }
}
exports.default = UserIdInvalid;
