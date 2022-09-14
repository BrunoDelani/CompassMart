"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
require("./infra/database/mongo/index");
require("dotenv/config");
const morgan_body_1 = __importDefault(require("morgan-body"));
const morgan_logger_1 = __importDefault(require("./config/morgan-logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const BrunoDelani_compass_mart_0_0_1_swagger_json_1 = __importDefault(require("./docs/BrunoDelani-compass-mart-0.0.1-swagger.json"));
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        (0, morgan_body_1.default)(this.express, {
            noColors: true,
            stream: morgan_logger_1.default
        });
        this.express.use(express_1.default.json());
        this.express.use('/api/v1/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(BrunoDelani_compass_mart_0_0_1_swagger_json_1.default));
        this.express.use((0, cors_1.default)());
    }
    routes() {
        this.express.use(...index_1.default);
    }
}
exports.default = new App().express;
