"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var product_rules_1 = __importDefault(require("../../../utils/product-rules"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, min: product_rules_1["default"].minPrice, max: product_rules_1["default"].maxPrice, required: true },
    qtd_stock: { type: Number, max: product_rules_1["default"].maxStock, required: true },
    stock_control_enabled: { type: Boolean, required: true },
    bar_codes: { type: String, minlength: product_rules_1["default"].barCodesLength, maxlength: product_rules_1["default"].barCodesLength, unique: true, required: true }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            return {
                id: ret._id,
                title: ret.title,
                description: ret.description,
                department: ret.department,
                brand: ret.brand,
                price: ret.price,
                qtd_stock: ret.qtd_stock,
                stock_control_enabled: ret.stock_control_enabled,
                bar_codes: ret.bar_codes,
                created_at: ret.created_at,
                updated_at: ret.updated_at
            };
        }
    }
});
ProductSchema.plugin(mongoose_paginate_v2_1["default"]);
exports["default"] = (0, mongoose_1.model)('product', ProductSchema);
