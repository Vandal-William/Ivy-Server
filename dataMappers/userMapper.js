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
const client_1 = __importDefault(require("../data/client"));
const userMapper = {
    fetchUser: (mail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM "user" WHERE mail = $1`;
            const values = [mail];
            const result = yield client_1.default.query(query, values);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur", error);
            throw error;
        }
    }),
};
exports.default = userMapper;
