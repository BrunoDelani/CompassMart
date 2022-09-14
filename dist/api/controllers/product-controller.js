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
const product_barcodes_exists_1 = __importDefault(require("../../errors/product/product-barcodes-exists"));
const page_not_found_1 = __importDefault(require("../../errors/page-not-found"));
const product_not_found_1 = __importDefault(require("../../errors/product/product-not-found"));
const products_not_found_1 = __importDefault(require("../../errors/product/products-not-found"));
const product_service_1 = __importDefault(require("../services/product-service"));
const product_csv_not_found_1 = __importDefault(require("../../errors/product/product-csv-not-found"));
const ObjectId = require('mongodb').ObjectId;
class ProductController {
    findProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_service_1.default.findProducts(req.query);
                return res.status(200).json(products);
            }
            catch (BadRequest) {
                if (BadRequest instanceof page_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                if (BadRequest instanceof products_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    findProductLowStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_service_1.default.findProductsLowStock(req.query);
                return res.status(200).json(products);
            }
            catch (BadRequest) {
                if (BadRequest instanceof page_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                if (BadRequest instanceof products_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    findProductByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                const result = yield product_service_1.default.findProductByID(id);
                return res.status(200).json(result);
            }
            catch (BadRequest) {
                if (BadRequest instanceof product_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.default.createProduct(req.body);
                return res.status(201).json(result);
            }
            catch (BadRequest) {
                if (BadRequest instanceof product_barcodes_exists_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    createProductCSV(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const csv = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString('utf-8');
                if (csv === undefined)
                    throw new product_csv_not_found_1.default();
                const result = yield product_service_1.default.createProductsByCSV(csv);
                return res.status(200).json(result);
            }
            catch (BadRequest) {
                if (BadRequest instanceof product_csv_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                const productUpdated = yield product_service_1.default.updateProduct(id, req.body);
                return res.status(200).json(productUpdated);
            }
            catch (BadRequest) {
                if (BadRequest instanceof product_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    deleteProductByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                yield product_service_1.default.deleteProductByID(id);
                return res.status(204).send();
            }
            catch (BadRequest) {
                if (BadRequest instanceof product_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    mapperProductByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                const result = yield product_service_1.default.mapperProduct(id);
                return res.status(200).json(result);
            }
            catch (BadRequest) {
                if (BadRequest instanceof product_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
}
exports.default = new ProductController();
