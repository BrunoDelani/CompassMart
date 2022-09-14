"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var product_routes_1 = __importDefault(require("./product-routes"));
var user_routes_1 = __importDefault(require("./user-routes"));
exports["default"] = [product_routes_1["default"], user_routes_1["default"]];
