"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductRules {
    constructor() {
        this.minPrice = 0.01;
        this.maxPrice = 1000;
        this.minStock = 0;
        this.minStockToRegister = 1;
        this.maxStock = 100000;
        this.barCodesLength = 13;
        this.lowStock = 100;
    }
}
exports.default = new ProductRules();
