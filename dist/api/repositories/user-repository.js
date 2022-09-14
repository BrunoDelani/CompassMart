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
const paginate_custom_labels_1 = __importDefault(require("../../utils/paginate-custom-labels"));
const user_schema_1 = __importDefault(require("../models/schemas/user-schema"));
class UserRepository {
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: query.page || 1,
                limit: query.limit || 50,
                customLabels: new paginate_custom_labels_1.default('users')
            };
            const resultsPaginate = yield user_schema_1.default.paginate({}, options);
            return resultsPaginate;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_schema_1.default.findOne({ _id: id });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_schema_1.default.findOne({ email });
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_schema_1.default.create(payload);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_schema_1.default.findByIdAndDelete({ _id: id });
        });
    }
}
;
exports.default = new UserRepository();
