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
class Otpservice extends abstract_service_1.default {
    constructor() {
        super();
    }
    //send otp service
    otpServiceMethod(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = lib_1.default.otpGenNumber(6);
            const ifres = yield this.db('email_verification_table')
                .where('email', email)
                .first()
                .count();
            const findRow = ifres['count(*)'];
            if (Number(findRow) > 0) {
                return {
                    success: false,
                    code: 401,
                    message: 'User Already Ase',
                };
            }
            else {
                const res = yield this.db('email_verification_table').insert({
                    email,
                    otp,
                });
                // Lib.customSendMail(email, 'One Time Password (Otp)', 'this is otp', otp);
                if (res.length) {
                    return {
                        success: true,
                        code: 201,
                        message: 'Otp Sent Successfully',
                        data: {
                            email,
                            otp,
                        },
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
    //check otp service
    otpCheckServiceMethod(otp_email, otp_chek) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifres = yield this.db('email_verification_table')
                .where('email', otp_email)
                .andWhere('status', 'sendotp')
                .andWhere('otp', otp_chek)
                .first()
                .count();
            const getId = yield this.db('email_verification_table')
                .where('email', otp_email)
                .andWhere('status', 'sendotp')
                .andWhere('otp', otp_chek)
                .first();
            const findRow = ifres['count(*)'];
            if (Number(findRow) > 0) {
                const res = yield this.db('email_verification_table')
                    .where('email_verify_id', getId['email_verify_id'])
                    .update({ status: 'checked' });
                // Lib.customSendMail(email, 'One Time Password (Otp)', 'this is otp', otp);
                if (res) {
                    return {
                        success: true,
                        code: 201,
                        message: 'Otp Check Successfully',
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
            else {
                return {
                    success: false,
                    code: 401,
                    message: 'Otp Not Matched',
                };
            }
        });
    }
    //forget check user
    otpForgetService(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifres = yield this.db('users').where('email', email).first().count();
            const ifalready = yield this.db('email_verification_table')
                .where('email', email)
                .first()
                .count();
            const findRow = ifres['count(*)'];
            if (Number(findRow) < 0) {
                return {
                    success: false,
                    code: 401,
                    message: 'No user Found',
                };
            }
            else {
                const otpreal = lib_1.default.otpGenNumber(6);
                yield this.db('email_verification_table').insert({
                    email: email,
                    otp: otpreal,
                    action: 'ForgetPassword',
                });
                lib_1.default.customSendMail(email, 'Forget Password Otp', '', otpreal);
            }
            console.log(findRow);
            return {
                success: true,
                code: 201,
                data: { findRow },
            };
        });
    }
    //forget check user
    otpForgetServiceCrossCheck(email, user_otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifres = yield this.db('email_verification_table')
                .where('email', email)
                .andWhere('action', 'ForgetPassword')
                .first()
                .count();
            const findRow = ifres['count(*)'];
            // console.log(findRow);
            // console.log(user_otp);
            if (Number(findRow) === 0) {
                return {
                    success: false,
                    code: 401,
                    message: 'No Otp Found',
                };
            }
            else {
                const match = yield this.db('email_verification_table')
                    .where('email', email)
                    .andWhere('otp', user_otp)
                    .first()
                    .count();
                const findRowMatch = match['count(*)'];
                if (Number(findRowMatch) === 1) {
                    yield this.db('email_verification_table')
                        .where('email', email)
                        .delete();
                    return {
                        success: true,
                        code: 201,
                        message: 'Otp Matched Successfully',
                    };
                }
                else {
                    return {
                        success: false,
                        code: 401,
                        message: 'Wrong Otp Entered',
                    };
                }
            }
        });
    }
    forgetchangePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifres = yield this.db('users').where('email', email).first().count();
            const findRow = ifres['count(*)'];
            if (Number(findRow) === 0) {
                return {
                    success: false,
                    code: 401,
                    message: 'No User Found',
                };
            }
            else {
                const hashPas = yield lib_1.default.hashPass(password);
                const change = yield this.db('users')
                    .where('email', email)
                    .update({ password: hashPas });
                return {
                    success: true,
                    code: 201,
                    message: 'Password Changed Successfully',
                };
            }
        });
    }
    //change password
    changePasswordInsideCheck(email, password, changed_password) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.db('users').select('*').where({ email });
            //checking if user a
            if (!checkUser.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                };
            }
            const _a = checkUser[0], { password: hashPass } = _a, rest = __rest(_a, ["password"]);
            const checkPass = yield lib_1.default.compare(password, hashPass);
            if (checkPass == false) {
                return {
                    success: false,
                    code: 401,
                    message: 'You have entered wrong password',
                };
            }
            else {
                const newPassword = yield lib_1.default.hashPass(changed_password);
                const changedPassword = yield this.db('users')
                    .where({ email })
                    .update({ password: newPassword });
                return {
                    success: true,
                    code: 201,
                    message: 'Password Changed Successfully',
                };
            }
            //change password
        });
    }
}
exports.default = Otpservice;
