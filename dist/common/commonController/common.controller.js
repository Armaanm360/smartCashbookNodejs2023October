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
const responseMessage_1 = __importDefault(require("../../utils/miscellaneous/responseMessage"));
const statusCode_1 = __importDefault(require("../../utils/miscellaneous/statusCode"));
const common_abstract_controller_1 = __importDefault(require("../commonAbstract/common.abstract.controller"));
const common_service_1 = __importDefault(require("../commonService/common.service"));
class CommonController extends common_abstract_controller_1.default {
    constructor() {
        super();
        this.commonService = new common_service_1.default();
        // send email otp
        this.sendEmailOtpController = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, type } = req.body;
            let table = '';
            let field = '';
            let otpFor = '';
            switch (type) {
                case 'forget_admin':
                    table = 'user_admin';
                    field = 'email';
                    otpFor = 'Admin Reset Password';
                    break;
                case 'forget_member':
                    table = 'user_member';
                    field = 'email';
                    otpFor = 'Member Reset Password';
                    break;
                case 'forget_trainee':
                    table = 'user_trainee';
                    field = 'email';
                    otpFor = 'Trainee Reset Password';
                    break;
                default:
                    break;
            }
            const obj = { email, type, otpFor };
            let data = {
                success: false,
                code: statusCode_1.default.HTTP_BAD_REQUEST,
                message: 'Something is wrong',
            };
            if (type.startsWith('forget')) {
                const checkUser = yield this.commonService.checkUserByUniqueKey({
                    table,
                    field,
                    value: email,
                });
                if (checkUser) {
                    data = yield this.commonService.sendOtpToEmailService(obj);
                }
                else {
                    data = {
                        success: false,
                        code: statusCode_1.default.HTTP_NOT_FOUND,
                        message: responseMessage_1.default.NOT_FOUND_USER_WITH_EMAIL,
                    };
                }
            }
            else {
                data = yield this.commonService.sendOtpToEmailService(obj);
            }
            const { code } = data, rest = __rest(data, ["code"]);
            res.status(code).json(rest);
        }));
        // match email otp
        this.matchEmailOtpController = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, otp, type } = req.body;
            const _a = yield this.commonService.matchEmailOtpService({
                email,
                otp,
                type,
            }), { code } = _a, data = __rest(_a, ["code"]);
            res.status(code).json(data);
        }));
    }
}
exports.default = CommonController;
