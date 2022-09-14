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
const product_schema_1 = __importDefault(require("../models/schemas/product-schema"));
const paginate_custom_labels_1 = __importDefault(require("../../utils/paginate-custom-labels"));
const product_rules_1 = __importDefault(require("../../utils/product-rules"));
class ProductRepository {
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: query.page || 1,
                limit: query.limit || 50,
                customLabels: new paginate_custom_labels_1.default('products')
            };
            const resultsPaginate = yield product_schema_1.default.paginate({
                department: { $regex: (query.department !== undefined ? query.department : '') },
                brand: { $regex: (query.brand !== undefined ? query.brand : '') },
                stock_control_enabled: true
            }, options);
            return resultsPaginate;
        });
    }
    findByLowStock(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: query.page || 1,
                limit: query.limit || 50,
                sort: { qtd_stock: 1 },
                customLabels: new paginate_custom_labels_1.default('products')
            };
            const resultsPaginate = yield product_schema_1.default.paginate({
                qtd_stock: { $lt: product_rules_1.default.lowStock },
                stock_control_enabled: true
            }, options);
            return resultsPaginate;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_schema_1.default.findById({ _id: id });
        });
    }
    findByBarCode(barCodes) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_schema_1.default.findOne({ bar_codes: barCodes });
            return result !== null;
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_schema_1.default.create(payload);
        });
    }
    insertMany(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_schema_1.default.insertMany(payload);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_schema_1.default.findByIdAndUpdate({ _id: id }, payload, { new: true });
            if (result)
                return result;
            return null;
        });
    }
    deleteByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_schema_1.default.findByIdAndDelete({ _id: id });
        });
    }
}
exports.default = new ProductRepository();
