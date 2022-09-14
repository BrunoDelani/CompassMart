"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_no_provided_1 = __importDefault(require("../errors/authenticate/token-no-provided"));
const token_invalid_1 = __importDefault(require("../errors/authenticate/token-invalid"));
const token_malformatted_1 = __importDefault(require("../errors/authenticate/token-malformatted"));
const jwt = require('jsonwebtoken');
exports.default = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ BadRequest: token_no_provided_1.default });
    const parts = authHeader.split(' ');
    if (parts.length !== 2)
        return res.status(401).send({ BadRequest: token_invalid_1.default });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ BadRequest: token_malformatted_1.default });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).send({ BadRequest: token_invalid_1.default });
        return next();
    });
};
