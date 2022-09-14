"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var moment_1 = __importDefault(require("moment"));
var logMorgan = fs_1["default"].createWriteStream(path_1["default"].join(__dirname, '../../log/request', "express".concat((0, moment_1["default"])().format('YYYY-MM-DD'), ".log")), { flags: 'a' });
exports["default"] = logMorgan;
