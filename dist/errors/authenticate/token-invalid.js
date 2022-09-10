"use strict";
exports.__esModule = true;
var InvalidToken = /** @class */ (function () {
    function InvalidToken() {
        this.message = 'Invalid token.';
        this.statusCode = 401;
    }
    return InvalidToken;
}());
exports["default"] = new InvalidToken();
