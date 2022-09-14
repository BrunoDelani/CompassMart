"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const winston_logger_1 = __importDefault(require("../../../config/winston-logger"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({
    path: process.env.NODE_ENV === 'test'
        ? path_1.default.resolve('.env.tests')
        : path_1.default.resolve('.env')
});
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        const dbConnectionPath = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.w1es0.mongodb.net/${process.env.DB_NAME}`;
        mongoose_1.default.connect(dbConnectionPath);
        mongoose_1.default.connection.on('error', () => {
            winston_logger_1.default.error('Could not connect to database.');
        });
        mongoose_1.default.connection.once('open', () => {
            winston_logger_1.default.info(`Connection established with the database ${process.env.DB_NAME}.`);
        });
        return mongoose_1.default.connection;
    }
}
exports.default = new Database().connect;
