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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userMapper_1 = __importDefault(require("../dataMappers/userMapper"));
const user = {
    connectUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { mail, password } = req.body;
        const findUser = yield userMapper_1.default.fetchUser(mail);
        if (findUser === null) {
            const message = `nom d'utilisateur ou mot de passe incorrect`;
            res.json(message);
        }
        if (findUser) {
            const isValidPassword = bcrypt_1.default.compareSync(password, findUser.password);
            if (!isValidPassword) {
                const message = `nom d'utilisateur ou mot de passe incorrect`;
                res.json(message);
            }
            else {
                res.json(findUser);
            }
        }
    })
};
exports.default = user;
