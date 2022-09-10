"use strict";
exports.__esModule = true;
var winston_1 = require("winston");
var winstonLogger = (0, winston_1.createLogger)({
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
exports["default"] = winstonLogger;
