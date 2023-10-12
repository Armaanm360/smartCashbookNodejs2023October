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
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const config_1 = __importDefault(require("../../config/config"));
const sendEmailOtp_1 = require("../../templates/sendEmailOtp");
const responseMessage_1 = __importDefault(require("../../utils/miscellaneous/responseMessage"));
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
class CommonService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // send otp to email
    sendOtpToEmailService(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const checkOtp = yield this.db('email_otp')
                    .select('id', 'hashed_otp', 'tried')
                    .andWhere('email', obj.email)
                    .andWhere('type', obj.type)
                    .andWhere('matched', 0)
                    .andWhere('tried', '<', 3)
                    .andWhereRaw("ADDTIME(created_at, '0:3:0') > NOW()");
                if (checkOtp.length > 0) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_GONE,
                        message: this.ResMsg.THREE_TIMES_EXPIRED,
                    };
                }
                const otp = lib_1.default.otpGenNumber(6);
                const hashed_otp = yield lib_1.default.hashPass(otp);
                const otpCreds = {
                    hashed_otp: hashed_otp,
                    email: obj.email,
                    type: obj.type,
                };
                const sended = yield lib_1.default.sendEmail(obj.email, `Your One Time Password For BAB ${obj.otpFor}`, (0, sendEmailOtp_1.sendEmailOtpTemplate)(otp, obj.otpFor));
                console.log({ sended });
                yield trx('email_otp').insert(otpCreds);
                if (sended) {
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_OK,
                        message: this.ResMsg.OTP_SENT,
                        data: {
                            email: obj.email,
                        },
                    };
                }
                else {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_UNPROCESSABLE_ENTITY,
                        message: this.ResMsg.OTP_NOT_SENT,
                    };
                }
            }));
        });
    }
    // match email otp
    matchEmailOtpService(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = 'email_otp';
            const checkOtp = yield this.db(table)
                .select('id', 'hashed_otp', 'tried')
                .andWhere('email', obj.email)
                .andWhere('type', obj.type)
                .andWhere('matched', 0)
                .andWhereRaw("ADDTIME(created_at, '0:3:0') > NOW()");
            if (!checkOtp.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_FORBIDDEN,
                    message: responseMessage_1.default.OTP_EXPIRED,
                };
            }
            const { id: email_otp_id, hashed_otp, tried } = checkOtp[0];
            if (tried > 3) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_GONE,
                    message: this.ResMsg.TOO_MUCH_ATTEMPT,
                };
            }
            const otpValidation = yield lib_1.default.compare(obj.otp, hashed_otp);
            if (otpValidation) {
                yield this.db(table)
                    .update({
                    tried: tried + 1,
                    matched: 1,
                })
                    .where('id', email_otp_id);
                let secret = config_1.default.JWT_SECRET_ADMIN;
                switch (obj.type) {
                    case 'forget_admin':
                        secret = config_1.default.JWT_SECRET_ADMIN;
                        break;
                    case 'forget_member':
                        secret = config_1.default.JWT_SECRET_MEMBER;
                        break;
                    case 'forget_trainee':
                        secret = config_1.default.JWT_SECRET_TRAINEE;
                        break;
                    default:
                        break;
                }
                const token = lib_1.default.createToken({
                    email: obj.email,
                    type: obj.type,
                }, secret, '5m');
                return {
                    success: true,
                    code: this.StatusCode.HTTP_ACCEPTED,
                    message: this.ResMsg.OTP_MATCHED,
                    token,
                };
            }
            else {
                yield this.db(table)
                    .update({
                    tried: tried + 1,
                })
                    .where('id', email_otp_id);
                return {
                    success: false,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                    message: this.ResMsg.OTP_INVALID,
                };
            }
        });
    }
    // check user by unique key
    checkUserByUniqueKey(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.db(obj.table)
                .select('*')
                .where(obj.field, obj.value);
            if (check.length) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    // create audit trail service
    createAuditTrailService(admin_id, details, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = 1;
            if (code > 299) {
                status = 0;
            }
            const res = yield this.db('audit_trail').insert({
                admin_id,
                status,
                details,
            });
            if (res.length) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    // common forget password change service
    forgetPassword({ table, passField, password, userEmailField, userEmail, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPass = yield lib_1.default.hashPass(password);
            const updatePass = yield this.db(table)
                .update(passField, hashedPass)
                .where(userEmailField, userEmail);
            return updatePass;
        });
    }
}
exports.default = CommonService;
