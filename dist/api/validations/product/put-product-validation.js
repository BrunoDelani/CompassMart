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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const product_rules_1 = __importDefault(require("../../../utils/product-rules"));
const product_id_invalid_1 = __importDefault(require("../../../errors/product/product-id-invalid"));
const ObjectId = require('mongoose').Types.ObjectId;
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = ObjectId.isValid(req.params.id);
        if (!isValid)
            throw new product_id_invalid_1.default();
        const ProductValidationSchema = joi_1.default.object({
            title: joi_1.default.string().trim().required(),
            description: joi_1.default.string().trim().required(),
            department: joi_1.default.string().trim().required(),
            brand: joi_1.default.string().trim().required(),
            price: joi_1.default.number().min(product_rules_1.default.minPrice).max(product_rules_1.default.maxPrice).required(),
            qtd_stock: joi_1.default.number().min(product_rules_1.default.minStock).max(product_rules_1.default.maxStock).required()
        });
        const { error } = yield ProductValidationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: 'Bad Request',
                details: error.details.map((detail) => ({
                    name: detail.path.join('.'),
                    description: detail.message
                }))
            });
        }
        return next();
    }
    catch (BadRequest) {
        if (BadRequest instanceof product_id_invalid_1.default)
            return res.status(BadRequest.statusCode).json({ BadRequest });
        return res.status(400).json(BadRequest);
    }
});
