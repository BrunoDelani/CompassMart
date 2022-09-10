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
var joi_1 = __importDefault(require("joi"));
var product_rules_1 = __importDefault(require("../../../utils/product-rules"));
var product_id_invalid_1 = __importDefault(require("../../../errors/product/product-id-invalid"));
var ObjectId = require('mongoose').Types.ObjectId;
exports["default"] = (function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid, ProductValidationSchema, error, BadRequest_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                isValid = ObjectId.isValid(req.params.id);
                if (!isValid)
                    throw new product_id_invalid_1["default"]();
                ProductValidationSchema = joi_1["default"].object({
                    title: joi_1["default"].string().trim().required(),
                    description: joi_1["default"].string().trim().required(),
                    department: joi_1["default"].string().trim().required(),
                    brand: joi_1["default"].string().trim().required(),
                    price: joi_1["default"].number().min(product_rules_1["default"].minPrice).max(product_rules_1["default"].maxPrice).required(),
                    qtd_stock: joi_1["default"].number().min(product_rules_1["default"].minStock).max(product_rules_1["default"].maxStock).required()
                });
                return [4 /*yield*/, ProductValidationSchema.validate(req.body, { abortEarly: false })];
            case 1:
                error = (_a.sent()).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Bad Request',
                            details: error.details.map(function (detail) { return ({
                                name: detail.path.join('.'),
                                description: detail.message
                            }); })
                        })];
                }
                return [2 /*return*/, next()];
            case 2:
                BadRequest_1 = _a.sent();
                if (BadRequest_1 instanceof product_id_invalid_1["default"])
                    return [2 /*return*/, res.status(BadRequest_1.statusCode).json({ BadRequest: BadRequest_1 })];
                return [2 /*return*/, res.status(400).json(BadRequest_1)];
            case 3: return [2 /*return*/];
        }
    });
}); });