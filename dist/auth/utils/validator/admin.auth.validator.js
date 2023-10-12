"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminAuthValidator {
    adminValidator() {
        return [
        // body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isString(),
        // body('password', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isString(),
        ];
    }
}
exports.default = AdminAuthValidator;
