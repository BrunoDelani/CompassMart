"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../api/controllers/product-controller"));
const create_product_validation_1 = __importDefault(require("../api/validations/product/create-product-validation"));
const id_product_validation_1 = __importDefault(require("../api/validations/product/id-product-validation"));
const patch_product_validation_1 = __importDefault(require("../api/validations/product/patch-product-validation"));
const put_product_validation_1 = __importDefault(require("../api/validations/product/put-product-validation"));
const multer_1 = __importDefault(require("multer"));
const authenticate_user_1 = __importDefault(require("../middlewares/authenticate-user"));
const multerConfig = (0, multer_1.default)();
const router = (0, express_1.Router)();
const urlBaseRoute = '/api/v1/product';
router
    .get(`${urlBaseRoute}`, authenticate_user_1.default, product_controller_1.default.findProduct)
    .post(`${urlBaseRoute}`, authenticate_user_1.default, create_product_validation_1.default, product_controller_1.default.createProduct)
    .post(`${urlBaseRoute}/csv`, authenticate_user_1.default, multerConfig.single('file'), product_controller_1.default.createProductCSV)
    .get(`${urlBaseRoute}/low_stock`, authenticate_user_1.default, product_controller_1.default.findProductLowStock)
    .get(`${urlBaseRoute}/marketplace/:id`, authenticate_user_1.default, id_product_validation_1.default, product_controller_1.default.mapperProductByID)
    .get(`${urlBaseRoute}/:id`, authenticate_user_1.default, id_product_validation_1.default, product_controller_1.default.findProductByID)
    .put(`${urlBaseRoute}/:id`, authenticate_user_1.default, put_product_validation_1.default, product_controller_1.default.updateProduct)
    .patch(`${urlBaseRoute}/:id`, authenticate_user_1.default, patch_product_validation_1.default, product_controller_1.default.updateProduct)
    .delete(`${urlBaseRoute}/:id`, authenticate_user_1.default, id_product_validation_1.default, product_controller_1.default.deleteProductByID);
exports.default = router;
