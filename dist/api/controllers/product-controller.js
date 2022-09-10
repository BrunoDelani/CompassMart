"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var product_barcodes_exists_1 = __importDefault(require("../../errors/product/product-barcodes-exists"));
var page_not_found_1 = __importDefault(require("../../errors/page-not-found"));
var product_not_found_1 = __importDefault(require("../../errors/product/product-not-found"));
var products_not_found_1 = __importDefault(require("../../errors/product/products-not-found"));
var product_service_1 = __importDefault(require("../services/product-service"));
var product_csv_not_found_1 = __importDefault(require("../../errors/product/product-csv-not-found"));
var ObjectId = require('mongodb').ObjectId;
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.prototype.findProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products, BadRequest_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product_service_1["default"].findProducts(req.query)];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.status(200).json(products)];
                    case 2:
                        BadRequest_1 = _a.sent();
                        if (BadRequest_1 instanceof page_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_1.statusCode).json({ BadRequest: BadRequest_1 })];
                        if (BadRequest_1 instanceof products_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_1.statusCode).json({ BadRequest: BadRequest_1 })];
                        return [2 /*return*/, res.status(500).json(BadRequest_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.findProductLowStock = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products, BadRequest_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product_service_1["default"].findProductsLowStock(req.query)];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.status(200).json(products)];
                    case 2:
                        BadRequest_2 = _a.sent();
                        if (BadRequest_2 instanceof page_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_2.statusCode).json({ BadRequest: BadRequest_2 })];
                        if (BadRequest_2 instanceof products_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_2.statusCode).json({ BadRequest: BadRequest_2 })];
                        return [2 /*return*/, res.status(500).json(BadRequest_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.findProductByID = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, BadRequest_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new ObjectId(req.params.id);
                        return [4 /*yield*/, product_service_1["default"].findProductByID(id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).json(result)];
                    case 2:
                        BadRequest_3 = _a.sent();
                        if (BadRequest_3 instanceof product_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_3.statusCode).json({ BadRequest: BadRequest_3 })];
                        return [2 /*return*/, res.status(500).json(BadRequest_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.createProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, BadRequest_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product_service_1["default"].createProduct(req.body)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(201).json(result)];
                    case 2:
                        BadRequest_4 = _a.sent();
                        if (BadRequest_4 instanceof product_barcodes_exists_1["default"])
                            return [2 /*return*/, res.status(BadRequest_4.statusCode).json({ BadRequest: BadRequest_4 })];
                        return [2 /*return*/, res.status(500).json(BadRequest_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.createProductCSV = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var csv, result, BadRequest_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        csv = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString('utf-8');
                        if (csv === undefined)
                            throw new product_csv_not_found_1["default"]();
                        return [4 /*yield*/, product_service_1["default"].createProductsByCSV(csv)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.status(200).json(result)];
                    case 2:
                        BadRequest_5 = _b.sent();
                        if (BadRequest_5 instanceof product_csv_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_5.statusCode).json({ BadRequest: BadRequest_5 })];
                        return [2 /*return*/, res.status(500).json(BadRequest_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.updateProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, productUpdated, BadRequest_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new ObjectId(req.params.id);
                        return [4 /*yield*/, product_service_1["default"].updateProduct(id, req.body)];
                    case 1:
                        productUpdated = _a.sent();
                        return [2 /*return*/, res.status(200).json(productUpdated)];
                    case 2:
                        BadRequest_6 = _a.sent();
                        if (BadRequest_6 instanceof product_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_6.statusCode).json({ BadRequest: BadRequest_6 })];
                        return [2 /*return*/, res.status(500).json(BadRequest_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.deleteProductByID = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, BadRequest_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new ObjectId(req.params.id);
                        return [4 /*yield*/, product_service_1["default"].deleteProductByID(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(204).send()];
                    case 2:
                        BadRequest_7 = _a.sent();
                        if (BadRequest_7 instanceof product_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_7.statusCode).json({ BadRequest: BadRequest_7 })];
                        return [2 /*return*/, res.status(500).json(BadRequest_7)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.mapperProductByID = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, BadRequest_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new ObjectId(req.params.id);
                        return [4 /*yield*/, product_service_1["default"].mapperProduct(id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).json(result)];
                    case 2:
                        BadRequest_8 = _a.sent();
                        if (BadRequest_8 instanceof product_not_found_1["default"])
                            return [2 /*return*/, res.status(BadRequest_8.statusCode).json({ BadRequest: BadRequest_8 })];
                        return [2 /*return*/, res.status(500).json(BadRequest_8)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports["default"] = new ProductController();
