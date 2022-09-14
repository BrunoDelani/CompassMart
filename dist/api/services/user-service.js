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
const user_repository_1 = __importDefault(require("../repositories/user-repository"));
const users_not_found_1 = __importDefault(require("../../errors/user/users-not-found"));
const user_not_found_1 = __importDefault(require("../../errors/user/user-not-found"));
const page_not_found_1 = __importDefault(require("../../errors/page-not-found"));
const user_incorrect_password_1 = __importDefault(require("../../errors/user/user-incorrect-password"));
const user_email_exists_1 = __importDefault(require("../../errors/user/user-email-exists"));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class UserService {
    findUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield user_repository_1.default.find(query);
            if ((query.page && results.offsets) && (query.page > results.offsets))
                throw new page_not_found_1.default();
            if (query.page && query.page <= 0)
                throw new page_not_found_1.default();
            if (query.limit && query.limit <= 0)
                throw new page_not_found_1.default();
            if (!results.total)
                throw new users_not_found_1.default();
            return results;
        });
    }
    createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_repository_1.default.findByEmail(payload.email);
            if (result !== null)
                throw new user_email_exists_1.default();
            payload.password = yield bcrypt.hash(payload.password, Number(process.env.SALT_ROUND));
            const userCreate = yield user_repository_1.default.create(payload);
            const user = {
                id: userCreate.id,
                email: userCreate.email,
                token: yield this.generateToken(userCreate.email)
            };
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_repository_1.default.findById(id);
            if (result === null)
                throw new user_not_found_1.default();
            yield user_repository_1.default.delete(id);
        });
    }
    authenticateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_repository_1.default.findByEmail(payload.email);
            if (result === null)
                throw new user_not_found_1.default();
            if (!(yield bcrypt.compare(payload.password, result.password)))
                throw new user_incorrect_password_1.default();
            const user = { email: result.email, token: yield this.generateToken(result.email) };
            return user;
        });
    }
    generateToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return jwt.sign({ id: email }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE_TOKEN
            });
        });
    }
}
exports.default = new UserService();
