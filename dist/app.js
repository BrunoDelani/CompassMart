"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./routes/index"));
require("./infra/database/mongo/index");
require("dotenv/config");
var morgan_body_1 = __importDefault(require("morgan-body"));
var morgan_logger_1 = __importDefault(require("./config/morgan-logger"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var BrunoDelani_compass_mart_0_0_1_swagger_json_1 = __importDefault(require("./docs/BrunoDelani-compass-mart-0.0.1-swagger.json"));
var App = /** @class */ (function () {
    function App() {
        this.express = (0, express_1["default"])();
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        (0, morgan_body_1["default"])(this.express, {
            noColors: true,
            stream: morgan_logger_1["default"]
        });
        this.express.use(express_1["default"].json());
        this.express.use('/api/v1/api-docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(BrunoDelani_compass_mart_0_0_1_swagger_json_1["default"]));
        this.express.use((0, cors_1["default"])());
    };
    App.prototype.routes = function () {
        var _a;
        (_a = this.express).use.apply(_a, index_1["default"]);
    };
    return App;
}());
exports["default"] = new App().express;
