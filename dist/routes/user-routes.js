"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../api/controllers/user-controller"));
var user_validation_1 = __importDefault(require("../api/validations/user/user-validation"));
var id_user_validation_1 = __importDefault(require("../api/validations/user/id-user-validation"));
var router = (0, express_1.Router)();
var urlBaseRoute = '/api/v1';
router
    .get("".concat(urlBaseRoute, "/user"), user_controller_1["default"].findUser)
    .post("".concat(urlBaseRoute, "/user"), user_validation_1["default"], user_controller_1["default"].createUser)
    .post("".concat(urlBaseRoute, "/authenticate"), user_validation_1["default"], user_controller_1["default"].authenticateUser)["delete"]("".concat(urlBaseRoute, "/user/:id"), id_user_validation_1["default"], user_controller_1["default"].deleteUser);
exports["default"] = router;
