"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var token_no_provided_1 = __importDefault(require("../errors/authenticate/token-no-provided"));
var token_invalid_1 = __importDefault(require("../errors/authenticate/token-invalid"));
var token_malformatted_1 = __importDefault(require("../errors/authenticate/token-malformatted"));
var jwt = require('jsonwebtoken');
exports["default"] = (function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ BadRequest: token_no_provided_1["default"] });
    var parts = authHeader.split(' ');
    if (parts.length !== 2)
        return res.status(401).send({ BadRequest: token_invalid_1["default"] });
    var scheme = parts[0], token = parts[1];
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ BadRequest: token_malformatted_1["default"] });
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err)
            return res.status(401).send({ BadRequest: token_invalid_1["default"] });
        return next();
    });
});
