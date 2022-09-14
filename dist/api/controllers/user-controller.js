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
const user_email_exists_1 = __importDefault(require("../../errors/user/user-email-exists"));
const user_service_1 = __importDefault(require("../services/user-service"));
const users_not_found_1 = __importDefault(require("../../errors/user/users-not-found"));
const user_not_found_1 = __importDefault(require("../../errors/user/user-not-found"));
const page_not_found_1 = __importDefault(require("../../errors/page-not-found"));
const user_incorrect_password_1 = __importDefault(require("../../errors/user/user-incorrect-password"));
const ObjectId = require('mongodb').ObjectId;
class UserController {
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.findUser(req.query);
                res.status(200).json(users);
            }
            catch (BadRequest) {
                if (BadRequest instanceof page_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                if (BadRequest instanceof users_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.createUser(req.body);
                res.status(201).json(result);
            }
            catch (BadRequest) {
                if (BadRequest instanceof user_email_exists_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                yield user_service_1.default.deleteUser(id);
                res.status(204).json();
            }
            catch (BadRequest) {
                if (BadRequest instanceof user_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
    authenticateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.authenticateUser(req.body);
                res.status(200).json(result);
            }
            catch (BadRequest) {
                if (BadRequest instanceof user_incorrect_password_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                if (BadRequest instanceof user_not_found_1.default)
                    return res.status(BadRequest.statusCode).json({ BadRequest });
                return res.status(500).json(BadRequest);
            }
        });
    }
}
exports.default = new UserController();
