"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var winston_logger_1 = __importDefault(require("../../../config/winston-logger"));
var path_1 = __importDefault(require("path"));
require('dotenv').config({
    path: process.env.NODE_ENV === 'test'
        ? path_1["default"].resolve('.env.tests')
        : path_1["default"].resolve('.env')
});
var Database = /** @class */ (function () {
    function Database() {
        this.connect();
    }
    Database.prototype.connect = function () {
        var dbConnectionPath = "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASS, "@").concat(process.env.DB_CLUSTER, ".w1es0.mongodb.net/").concat(process.env.DB_NAME);
        mongoose_1["default"].connect(dbConnectionPath);
        mongoose_1["default"].connection.on('error', function () {
            winston_logger_1["default"].error('Could not connect to database.');
        });
        mongoose_1["default"].connection.once('open', function () {
            winston_logger_1["default"].info("Connection established with the database ".concat(process.env.DB_NAME, "."));
        });
        return mongoose_1["default"].connection;
    };
    return Database;
}());
exports["default"] = new Database().connect;
