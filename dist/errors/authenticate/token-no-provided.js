"use strict";
exports.__esModule = true;
var NoToken = /** @class */ (function () {
    function NoToken() {
        this.message = 'No token provided.';
        this.statusCode = 401;
    }
    return NoToken;
}());
exports["default"] = new NoToken();
