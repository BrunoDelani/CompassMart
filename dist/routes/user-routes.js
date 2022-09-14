"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../api/controllers/user-controller"));
const user_validation_1 = __importDefault(require("../api/validations/user/user-validation"));
const id_user_validation_1 = __importDefault(require("../api/validations/user/id-user-validation"));
const router = (0, express_1.Router)();
const urlBaseRoute = '/api/v1';
router
    .get(`${urlBaseRoute}/user`, user_controller_1.default.findUser)
    .post(`${urlBaseRoute}/user`, user_validation_1.default, user_controller_1.default.createUser)
    .post(`${urlBaseRoute}/authenticate`, user_validation_1.default, user_controller_1.default.authenticateUser)
    .delete(`${urlBaseRoute}/user/:id`, id_user_validation_1.default, user_controller_1.default.deleteUser);
exports.default = router;
