"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const logMorgan = fs_1.default.createWriteStream(path_1.default.join(__dirname, '../../log/request', `express${(0, moment_1.default)().format('YYYY-MM-DD')}.log`), { flags: 'a' });
exports.default = logMorgan;
