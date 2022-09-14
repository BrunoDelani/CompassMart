"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, {
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            return {
                id: ret._id,
                email: ret.email
            };
        }
    }
});
UserSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)('user', UserSchema);
