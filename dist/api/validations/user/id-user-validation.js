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
const user_id_invalid_1 = __importDefault(require("../../../errors/user/user-id-invalid"));
const ObjectId = require('mongoose').Types.ObjectId;
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = ObjectId.isValid(req.params.id);
        if (!isValid)
            throw new user_id_invalid_1.default();
        return next();
    }
    catch (BadRequest) {
        if (BadRequest instanceof user_id_invalid_1.default)
            return res.status(BadRequest.statusCode).json({ BadRequest });
        return res.status(400).json(BadRequest);
    }
});
