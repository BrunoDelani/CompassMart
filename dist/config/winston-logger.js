"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winstonLogger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        new winston_1.transports.File({
            filename: 'log/info.log',
            level: 'info'
        }),
        new winston_1.transports.File({
            filename: 'log/error.log',
            level: 'error'
        })
    ]
});
exports.default = winstonLogger;
