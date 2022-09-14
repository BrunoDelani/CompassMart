"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const winston_logger_1 = __importDefault(require("./config/winston-logger"));
app_1.default.listen(process.env.PORT || process.env.API_PORT, () => {
    winston_logger_1.default.info(`Server running in port '${process.env.API_PORT}'`);
});
