"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validatorConstants_1 = require("./validatorConstants");
class CommonValidator {
    // commin login input validator
    loginValidator() {
        return [
            (0, express_validator_1.body)('email', 'Enter valid email or phone').exists().isEmail(),
            (0, express_validator_1.body)('password', 'Enter valid password minimun length 8')
                .exists()
                .isString()
                .isLength({ min: 8 }),
        ];
    }
    // common single param id input validator
    commonSingleParamsIdInputValidator(id = 'id', errMsg = 'Provide a valid id in params') {
        return [(0, express_validator_1.param)(id, errMsg).exists().isInt()];
    }
    // common forget password input validator
    commonForgetPassInputValidation() {
        return [
            (0, express_validator_1.body)('token', 'Provide valid token').isString(),
            (0, express_validator_1.body)('email', 'Provide valid email').isString(),
            (0, express_validator_1.body)('password', 'Please provide valid password thats length must be min 8').isLength({ min: 8 }),
        ];
    }
    // send email otp input validator
    sendOtpInputValidator() {
        return [
            (0, express_validator_1.body)('type', 'Please enter valid OTP type').isIn(validatorConstants_1.SEND_OTP_TYPES),
            (0, express_validator_1.body)('email', 'Enter valid email address').isEmail(),
        ];
    }
    // match email otp input validator
    matchEmailOtpInputValidator() {
        return [
            (0, express_validator_1.body)('email', 'Enter valid email').isEmail(),
            (0, express_validator_1.body)('otp', 'Enter valid otp').isInt(),
            (0, express_validator_1.body)('type', 'Enter valid otp type').isIn(validatorConstants_1.SEND_OTP_TYPES),
        ];
    }
}
exports.default = CommonValidator;
