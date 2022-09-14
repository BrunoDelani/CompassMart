"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileCSVNotFound {
    constructor() {
        this.message = 'File .csv not found.';
        this.statusCode = 404;
    }
}
exports.default = FileCSVNotFound;
