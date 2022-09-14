"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var product_barcodes_exists_1 = __importDefault(require("../../errors/product/product-barcodes-exists"));
var page_not_found_1 = __importDefault(require("../../errors/page-not-found"));
var product_not_found_1 = __importDefault(require("../../errors/product/product-not-found"));
var products_not_found_1 = __importDefault(require("../../errors/product/products-not-found"));
var product_repository_1 = __importDefault(require("../repositories/product-repository"));
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    ProductService.prototype.findProducts = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_repository_1["default"].find(query)];
                    case 1:
                        results = _a.sent();
                        if ((query.page && results.offsets) && (query.page > results.offsets))
                            throw new page_not_found_1["default"]();
                        if (query.page && query.page <= 0)
                            throw new page_not_found_1["default"]();
                        if (query.limit && query.limit <= 0)
                            throw new page_not_found_1["default"]();
                        if (!results.total)
                            throw new products_not_found_1["default"]();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    ProductService.prototype.findProductsLowStock = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_repository_1["default"].findByLowStock(query)];
                    case 1:
                        results = _a.sent();
                        if ((query.page && results.offsets) && (query.page > results.offsets))
                            throw new page_not_found_1["default"]();
                        if (query.page && query.page <= 0)
                            throw new page_not_found_1["default"]();
                        if (query.limit && query.limit <= 0)
                            throw new page_not_found_1["default"]();
                        if (!results.total)
                            throw new products_not_found_1["default"]();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    ProductService.prototype.findProductByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_repository_1["default"].findById(id)];
                    case 1:
                        result = _a.sent();
                        if (result === null)
                            throw new product_not_found_1["default"]();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ProductService.prototype.createProduct = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_repository_1["default"].findByBarCode(payload.bar_codes)];
                    case 1:
                        if (_a.sent())
                            throw new product_barcodes_exists_1["default"]();
                        payload.qtd_stock <= 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true;
                        return [4 /*yield*/, product_repository_1["default"].create(payload)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.createProductsByCSV = function (csv) {
        return __awaiter(this, void 0, void 0, function () {
            var objectList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        objectList = this.formatterCSV(csv);
                        objectList.shift();
                        return [4 /*yield*/, this.insertListProductsCSV(objectList)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.updateProduct = function (id, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var findProduct, updateProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_repository_1["default"].findById(id)];
                    case 1:
                        findProduct = _a.sent();
                        if (findProduct === null)
                            throw new product_not_found_1["default"]();
                        payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true;
                        return [4 /*yield*/, product_repository_1["default"].update(id, payload)];
                    case 2:
                        updateProduct = _a.sent();
                        if (updateProduct === null)
                            throw new product_not_found_1["default"]();
                        return [2 /*return*/, updateProduct];
                }
            });
        });
    };
    ProductService.prototype.deleteProductByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_repository_1["default"].findById(id)];
                    case 1:
                        result = _a.sent();
                        if (result === null)
                            throw new product_not_found_1["default"]();
                        return [4 /*yield*/, product_repository_1["default"].deleteByID(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.mapperProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, mapper, newProductFromatter, valueField, insertValues, key, mMap, pMap, type, optional;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_repository_1["default"].findById(id)];
                    case 1:
                        result = _a.sent();
                        if (result === null)
                            throw new product_not_found_1["default"]();
                        mapper = require('../mapper/mapper.json').fields;
                        newProductFromatter = {};
                        valueField = {};
                        insertValues = function (mMap, pMap, type, optional, newProductFromatter) {
                            var _a, _b;
                            // eslint-disable-next-line no-unreachable-loop
                            for (var index = 0; index <= (mMap.length - 1); index++) {
                                for (var key in newProductFromatter) {
                                    if (typeof newProductFromatter[key] === 'object') {
                                        if (mMap[index] === key) {
                                            mMap.shift();
                                            newProductFromatter[key] = __assign(__assign({}, newProductFromatter[key]), insertValues(mMap, pMap, type, optional, newProductFromatter[key]));
                                            return newProductFromatter;
                                        }
                                    }
                                    else if (mMap[index] === key) {
                                        mMap.shift();
                                        newProductFromatter[key] = __assign(__assign({}, newProductFromatter[key]), insertValues(mMap, pMap, type, optional, newProductFromatter));
                                        return newProductFromatter;
                                    }
                                    ;
                                }
                                if (mMap[index] !== mMap[mMap.length - 1]) {
                                    var field = mMap[index];
                                    mMap.shift();
                                    valueField = (_a = {}, _a[field] = insertValues(mMap, pMap, type, optional, newProductFromatter), _a);
                                    return valueField;
                                }
                                else {
                                    valueField = (_b = {}, _b[mMap[index]] = _this.formatterValueToMapper(result[pMap.toString()], type, optional), _b);
                                    return valueField;
                                }
                            }
                            ;
                        };
                        for (key in mapper) {
                            mMap = mapper[key].fieldMarket.split('.');
                            pMap = mapper[key].fieldProduct.split('.');
                            type = mapper[key].type;
                            optional = mapper[key].optional;
                            pMap.shift();
                            valueField = {};
                            newProductFromatter = __assign(__assign({}, newProductFromatter), insertValues(mMap, pMap, type, optional, newProductFromatter));
                        }
                        ;
                        return [2 /*return*/, newProductFromatter];
                }
            });
        });
    };
    ProductService.prototype.formatterValueToMapper = function (value, type, optional) {
        if (optional !== undefined) {
            if (optional[0] === 'currency') {
                var newValue = new Intl.NumberFormat(optional[1], {
                    style: 'currency',
                    currency: optional[2]
                }).format(value);
                return newValue;
            }
            else if (optional[0] === 'break') {
                var newValue = [];
                var breakValue = '';
                while (value.length > 0) {
                    for (var i = 0; i < optional[1]; i++) {
                        if (value[i])
                            breakValue += value[i];
                    }
                    for (var i = 0; i < optional[1]; i++) {
                        value = value.slice(1);
                    }
                    newValue.push(breakValue);
                    breakValue = '';
                }
                return newValue;
            }
            ;
        }
        else {
            switch (type) {
                case 'text':
                    return value.toString();
                case 'array':
                    return [value];
                case 'boolean':
                    if (value === true || value === 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                case 'number':
                    return Number(value);
            }
        }
        return undefined;
    };
    ProductService.prototype.formatterCSV = function (csv) {
        return csv.split('\n')
            .map(function (row) {
            return row.replace(/("[^"]*")/g, function (x) {
                return x.replace(/,/g, '.');
            }).replace(/"/gi, '').replace(/\r/gi, '').split(',');
        });
    };
    ProductService.prototype.insertListProductsCSV = function (csvFormated) {
        var csvFormated_1, csvFormated_1_1;
        var e_1, _a;
        var _b;
        return __awaiter(this, void 0, void 0, function () {
            var insertProducts, listResult, element, newProduct, verify, e_1_1, insertTimes, index;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        insertProducts = [];
                        listResult = {
                            success: 0,
                            errors: 0
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, 8, 13]);
                        csvFormated_1 = __asyncValues(csvFormated);
                        _c.label = 2;
                    case 2: return [4 /*yield*/, csvFormated_1.next()];
                    case 3:
                        if (!(csvFormated_1_1 = _c.sent(), !csvFormated_1_1.done)) return [3 /*break*/, 6];
                        element = csvFormated_1_1.value;
                        newProduct = {
                            title: element[0] || '',
                            description: element[1] || '',
                            department: element[2] || '',
                            brand: element[3] || '',
                            price: Number(element[4]) || 0,
                            qtd_stock: Number(element[5]) || 0,
                            stock_control_enabled: true,
                            bar_codes: element[6] || '',
                            created_at: new Date(),
                            updated_at: new Date()
                        };
                        return [4 /*yield*/, this.verifyProductToCreate(newProduct)];
                    case 4:
                        verify = _c.sent();
                        if (verify.verify === true) {
                            insertProducts.push(newProduct);
                            listResult.success = Number(listResult.success) + 1;
                        }
                        else {
                            listResult.errors = Number(listResult.errors) + 1;
                            listResult.error_details === undefined
                                ? listResult.error_details = [{
                                        title: newProduct.title,
                                        bar_codes: newProduct.bar_codes,
                                        errors: verify.messages,
                                        error: verify.message
                                    }]
                                : (_b = listResult.error_details) === null || _b === void 0 ? void 0 : _b.push({
                                    title: newProduct.title,
                                    bar_codes: newProduct.bar_codes,
                                    errors: verify.messages,
                                    error: verify.message
                                });
                        }
                        _c.label = 5;
                    case 5: return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _c.trys.push([8, , 11, 12]);
                        if (!(csvFormated_1_1 && !csvFormated_1_1.done && (_a = csvFormated_1["return"]))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(csvFormated_1)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13:
                        ;
                        insertTimes = Math.ceil(insertProducts.length / 100);
                        index = 0;
                        _c.label = 14;
                    case 14:
                        if (!(index <= insertTimes)) return [3 /*break*/, 17];
                        return [4 /*yield*/, product_repository_1["default"].insertMany(insertProducts.slice(index * 100, (index + 1) * 100))];
                    case 15:
                        _c.sent();
                        _c.label = 16;
                    case 16:
                        index++;
                        return [3 /*break*/, 14];
                    case 17: return [2 /*return*/, listResult];
                }
            });
        });
    };
    ProductService.prototype.verifyProductToCreate = function (newProduct) {
        return __awaiter(this, void 0, void 0, function () {
            var verificador;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        verificador = {
                            verify: true
                        };
                        if (['undefined', 'null', ''].includes(newProduct.title.toString())) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['Title is null.']
                                : verificador.messages.push('Title is null.');
                        }
                        if (['undefined', 'null', ''].includes(newProduct.description.toString())) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['Description is null.']
                                : verificador.messages.push('Description is null.');
                        }
                        if (['undefined', 'null', ''].includes(newProduct.department.toString())) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['Department is null.']
                                : verificador.messages.push('Department is null.');
                        }
                        if (['undefined', 'null', ''].includes(newProduct.brand.toString())) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['Brand is null.']
                                : verificador.messages.push('Brand is null.');
                        }
                        if (['undefined', 'null', ''].includes(newProduct.qtd_stock.toString())) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['Stock is null.']
                                : verificador.messages.push('Stock is null.');
                        }
                        else if (newProduct.qtd_stock > 100000 || newProduct.qtd_stock < 1) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ["Stock is ".concat(newProduct.qtd_stock, ".")]
                                : verificador.messages.push("Stock is ".concat(newProduct.qtd_stock, "."));
                        }
                        if (['undefined', 'null', ''].includes(newProduct.price.toString())) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['Price is null.']
                                : verificador.messages.push('Price is null.');
                        }
                        else if (newProduct.price < 0.01 || newProduct.price > 1000) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ["Price is ".concat(newProduct.price, ".")]
                                : verificador.messages.push("Price is ".concat(newProduct.price, "."));
                        }
                        if (newProduct.bar_codes.length !== 13) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['bar_codes hasn\'t 13 digit.']
                                : verificador.messages.push('bar_codes hasn\'t 13 digit.');
                        }
                        else if ((isNaN(Number(newProduct.bar_codes)))) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['bar_codes is not a number.']
                                : verificador.messages.push('bar_codes is not a number.');
                        }
                        return [4 /*yield*/, product_repository_1["default"].findByBarCode(newProduct.bar_codes)];
                    case 1:
                        if (_a.sent()) {
                            verificador.verify = false;
                            verificador.messages === undefined
                                ? verificador.messages = ['bar_codes duplicate']
                                : verificador.messages.push('bar_codes duplicate');
                        }
                        if (verificador.messages && verificador.messages.length < 2) {
                            verificador.message = verificador.messages[0];
                            delete verificador.messages;
                        }
                        return [2 /*return*/, verificador];
                }
            });
        });
    };
    return ProductService;
}());
exports["default"] = new ProductService();
