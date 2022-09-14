"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var product_controller_1 = __importDefault(require("../api/controllers/product-controller"));
var create_product_validation_1 = __importDefault(require("../api/validations/product/create-product-validation"));
var id_product_validation_1 = __importDefault(require("../api/validations/product/id-product-validation"));
var patch_product_validation_1 = __importDefault(require("../api/validations/product/patch-product-validation"));
var put_product_validation_1 = __importDefault(require("../api/validations/product/put-product-validation"));
var multer_1 = __importDefault(require("multer"));
var authenticate_user_1 = __importDefault(require("../middlewares/authenticate-user"));
var multerConfig = (0, multer_1["default"])();
var router = (0, express_1.Router)();
var urlBaseRoute = '/api/v1/product';
router
    .get("".concat(urlBaseRoute), authenticate_user_1["default"], product_controller_1["default"].findProduct)
    .post("".concat(urlBaseRoute), authenticate_user_1["default"], create_product_validation_1["default"], product_controller_1["default"].createProduct)
    .post("".concat(urlBaseRoute, "/csv"), authenticate_user_1["default"], multerConfig.single('file'), product_controller_1["default"].createProductCSV)
    .get("".concat(urlBaseRoute, "/low_stock"), authenticate_user_1["default"], product_controller_1["default"].findProductLowStock)
    .get("".concat(urlBaseRoute, "/marketplace/:id"), authenticate_user_1["default"], id_product_validation_1["default"], product_controller_1["default"].mapperProductByID)
    .get("".concat(urlBaseRoute, "/:id"), authenticate_user_1["default"], id_product_validation_1["default"], product_controller_1["default"].findProductByID)
    .put("".concat(urlBaseRoute, "/:id"), authenticate_user_1["default"], put_product_validation_1["default"], product_controller_1["default"].updateProduct)
    .patch("".concat(urlBaseRoute, "/:id"), authenticate_user_1["default"], patch_product_validation_1["default"], product_controller_1["default"].updateProduct)["delete"]("".concat(urlBaseRoute, "/:id"), authenticate_user_1["default"], id_product_validation_1["default"], product_controller_1["default"].deleteProductByID);
exports["default"] = router;
