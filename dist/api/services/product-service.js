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
Object.defineProperty(exports, "__esModule", { value: true });
const product_barcodes_exists_1 = __importDefault(require("../../errors/product/product-barcodes-exists"));
const page_not_found_1 = __importDefault(require("../../errors/page-not-found"));
const product_not_found_1 = __importDefault(require("../../errors/product/product-not-found"));
const products_not_found_1 = __importDefault(require("../../errors/product/products-not-found"));
const product_repository_1 = __importDefault(require("../repositories/product-repository"));
class ProductService {
    findProducts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield product_repository_1.default.find(query);
            if ((query.page && results.offsets) && (query.page > results.offsets))
                throw new page_not_found_1.default();
            if (query.page && query.page <= 0)
                throw new page_not_found_1.default();
            if (query.limit && query.limit <= 0)
                throw new page_not_found_1.default();
            if (!results.total)
                throw new products_not_found_1.default();
            return results;
        });
    }
    findProductsLowStock(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield product_repository_1.default.findByLowStock(query);
            if ((query.page && results.offsets) && (query.page > results.offsets))
                throw new page_not_found_1.default();
            if (query.page && query.page <= 0)
                throw new page_not_found_1.default();
            if (query.limit && query.limit <= 0)
                throw new page_not_found_1.default();
            if (!results.total)
                throw new products_not_found_1.default();
            return results;
        });
    }
    findProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_repository_1.default.findById(id);
            if (result === null)
                throw new product_not_found_1.default();
            return result;
        });
    }
    createProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield product_repository_1.default.findByBarCode(payload.bar_codes))
                throw new product_barcodes_exists_1.default();
            payload.qtd_stock <= 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true;
            return yield product_repository_1.default.create(payload);
        });
    }
    createProductsByCSV(csv) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectList = this.formatterCSV(csv);
            objectList.shift();
            return yield this.insertListProductsCSV(objectList);
        });
    }
    updateProduct(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const findProduct = yield product_repository_1.default.findById(id);
            if (findProduct === null)
                throw new product_not_found_1.default();
            payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true;
            const updateProduct = yield product_repository_1.default.update(id, payload);
            if (updateProduct === null)
                throw new product_not_found_1.default();
            return updateProduct;
        });
    }
    deleteProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_repository_1.default.findById(id);
            if (result === null)
                throw new product_not_found_1.default();
            yield product_repository_1.default.deleteByID(id);
        });
    }
    mapperProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_repository_1.default.findById(id);
            if (result === null)
                throw new product_not_found_1.default();
            const mapper = require('../mapper/mapper.json').fields;
            let newProductFromatter = {};
            let valueField = {};
            const insertValues = (mMap, pMap, type, optional, newProductFromatter) => {
                // eslint-disable-next-line no-unreachable-loop
                for (let index = 0; index <= (mMap.length - 1); index++) {
                    for (const key in newProductFromatter) {
                        if (typeof newProductFromatter[key] === 'object') {
                            if (mMap[index] === key) {
                                mMap.shift();
                                newProductFromatter[key] = Object.assign(Object.assign({}, newProductFromatter[key]), insertValues(mMap, pMap, type, optional, newProductFromatter[key]));
                                return newProductFromatter;
                            }
                        }
                        else if (mMap[index] === key) {
                            mMap.shift();
                            newProductFromatter[key] = Object.assign(Object.assign({}, newProductFromatter[key]), insertValues(mMap, pMap, type, optional, newProductFromatter));
                            return newProductFromatter;
                        }
                        ;
                    }
                    if (mMap[index] !== mMap[mMap.length - 1]) {
                        const field = mMap[index];
                        mMap.shift();
                        valueField = { [field]: insertValues(mMap, pMap, type, optional, newProductFromatter) };
                        return valueField;
                    }
                    else {
                        valueField = { [mMap[index]]: this.formatterValueToMapper(result[pMap.toString()], type, optional) };
                        return valueField;
                    }
                }
                ;
            };
            for (const key in mapper) {
                const mMap = mapper[key].fieldMarket.split('.');
                const pMap = mapper[key].fieldProduct.split('.');
                const type = mapper[key].type;
                const optional = mapper[key].optional;
                pMap.shift();
                valueField = {};
                newProductFromatter = Object.assign(Object.assign({}, newProductFromatter), insertValues(mMap, pMap, type, optional, newProductFromatter));
            }
            ;
            return newProductFromatter;
        });
    }
    formatterValueToMapper(value, type, optional) {
        if (optional !== undefined) {
            if (optional[0] === 'currency') {
                const newValue = new Intl.NumberFormat(optional[1], {
                    style: 'currency',
                    currency: optional[2]
                }).format(value);
                return newValue;
            }
            else if (optional[0] === 'break') {
                const newValue = [];
                let breakValue = '';
                while (value.length > 0) {
                    for (let i = 0; i < optional[1]; i++) {
                        if (value[i])
                            breakValue += value[i];
                    }
                    for (let i = 0; i < optional[1]; i++) {
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
    }
    formatterCSV(csv) {
        return csv.split('\n')
            .map((row) => row.replace(/("[^"]*")/g, (x) => {
            return x.replace(/,/g, '.');
        }).replace(/"/gi, '').replace(/\r/gi, '').split(','));
    }
    insertListProductsCSV(csvFormated) {
        var csvFormated_1, csvFormated_1_1;
        var e_1, _a;
        var _b;
        return __awaiter(this, void 0, void 0, function* () {
            const insertProducts = [];
            const listResult = {
                success: 0,
                errors: 0
            };
            try {
                for (csvFormated_1 = __asyncValues(csvFormated); csvFormated_1_1 = yield csvFormated_1.next(), !csvFormated_1_1.done;) {
                    const element = csvFormated_1_1.value;
                    const newProduct = {
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
                    const verify = yield this.verifyProductToCreate(newProduct);
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
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (csvFormated_1_1 && !csvFormated_1_1.done && (_a = csvFormated_1.return)) yield _a.call(csvFormated_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            ;
            const insertTimes = Math.ceil(insertProducts.length / 100);
            for (let index = 0; index <= insertTimes; index++) {
                yield product_repository_1.default.insertMany(insertProducts.slice(index * 100, (index + 1) * 100));
            }
            return listResult;
        });
    }
    verifyProductToCreate(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificador = {
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
                    ? verificador.messages = [`Stock is ${newProduct.qtd_stock}.`]
                    : verificador.messages.push(`Stock is ${newProduct.qtd_stock}.`);
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
                    ? verificador.messages = [`Price is ${newProduct.price}.`]
                    : verificador.messages.push(`Price is ${newProduct.price}.`);
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
            if (yield product_repository_1.default.findByBarCode(newProduct.bar_codes)) {
                verificador.verify = false;
                verificador.messages === undefined
                    ? verificador.messages = ['bar_codes duplicate']
                    : verificador.messages.push('bar_codes duplicate');
            }
            if (verificador.messages && verificador.messages.length < 2) {
                verificador.message = verificador.messages[0];
                delete verificador.messages;
            }
            return verificador;
        });
    }
}
exports.default = new ProductService();
