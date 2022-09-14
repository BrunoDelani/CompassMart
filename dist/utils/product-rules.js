"use strict";
exports.__esModule = true;
var ProductRules = /** @class */ (function () {
    function ProductRules() {
        this.minPrice = 0.01;
        this.maxPrice = 1000;
        this.minStock = 0;
        this.minStockToRegister = 1;
        this.maxStock = 100000;
        this.barCodesLength = 13;
        this.lowStock = 100;
    }
    return ProductRules;
}());
exports["default"] = new ProductRules();
