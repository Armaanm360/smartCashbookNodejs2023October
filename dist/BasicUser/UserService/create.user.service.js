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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
class CreateUserService extends abstract_service_1.default {
    constructor() {
        super();
    }
    createService({ username, email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const pass = yield lib_1.default.hashPass(password);
            const checkemail = yield this.db('users').where('email', email);
            if (checkemail.length) {
                return {
                    success: false,
                    code: 401,
                    message: 'User Email Already Used'
                };
            }
            else {
                const res = yield this.db('users').insert({
                    username,
                    email,
                    password: pass,
                });
                if (res.length) {
                    return {
                        success: true,
                        code: 201,
                        message: 'User added successfully',
                        data: { username, email },
                    };
                }
                else {
                    return {
                        success: false,
                        code: 401,
                        message: 'data not found',
                    };
                }
            }
        });
    }
    loginService({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const basic = yield this.db('users').select('*').where({ email });
            if (!basic.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                };
            }
            else {
                const checkuser = yield this.db('users').select('*').where({ email }).join('packages', 'packages.package_id', '=', 'users.package_activated');
                console.log(basic);
                const getUserPackage = checkuser[0].package_name;
                const getUserPackageId = checkuser[0].package_id;
                const getUserId = checkuser[0].id;
                const getUsername = checkuser[0].username;
                const _a = checkuser[0], { password: hashPass } = _a, rest = __rest(_a, ["password"]);
                const checkPass = yield lib_1.default.compare(password, hashPass);
                if (!checkPass) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_BAD_REQUEST,
                        message: this.ResMsg.WRONG_CREDENTIALS,
                    };
                }
                return {
                    success: true,
                    code: 201,
                    message: 'Logged In Successfully',
                    data: { getUserId, getUsername, email, getUserPackage, getUserPackageId }
                };
            }
        });
    }
}
exports.default = CreateUserService;
