"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
require("dotenv/config");
var winston_logger_1 = __importDefault(require("./config/winston-logger"));
app_1["default"].listen(process.env.API_PORT, function () {
    winston_logger_1["default"].info("Server running in port '".concat(process.env.API_PORT, "'"));
});
