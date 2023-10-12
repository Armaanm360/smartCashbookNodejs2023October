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
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const otp_service_1 = __importDefault(require("../UserService/otp.service"));
class OtpController extends abstract_controller_1.default {
    constructor() {
        super();
        this.createOtpService = new otp_service_1.default();
        this.getOtp = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.query;
            const otp = yield this.createOtpService.otpServiceMethod(String(email));
            res.status(201).json(otp);
        }));
        this.otpCheck = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { otp_email, otp_check } = req.query;
            const check_email_otp = yield this.createOtpService.otpCheckServiceMethod(String(otp_email), String(otp_check));
            res.status(201).json(check_email_otp);
        }));
        this.forgetOtp = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const _a = yield this.createOtpService.otpForgetService(email), { code } = _a, data = __rest(_a, ["code"]);
            res.status(code).json(data);
        }));
        this.forgetOtpMatch = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, user_otp } = req.body;
            const _b = yield this.createOtpService.otpForgetServiceCrossCheck(String(email), String(user_otp)), { code } = _b, data = __rest(_b, ["code"]);
            res.status(code).json(data);
        }));
        this.forgetchangePassword = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const _c = yield this.createOtpService.forgetchangePassword(String(email), String(password)), { code } = _c, data = __rest(_c, ["code"]);
            res.status(code).json(data);
        }));
        //change password
        this.changePasswordInsideCheck = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, changed_password } = req.body;
            const _d = yield this.createOtpService.changePasswordInsideCheck(String(email), String(password), String(changed_password)), { code } = _d, data = __rest(_d, ["code"]);
            res.status(code).json(data);
        }));
    }
}
exports.default = OtpController;
