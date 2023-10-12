"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const auth_member_controller_1 = __importDefault(require("../controller/auth.member.controller"));
class MemberAuthRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberController = new auth_member_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route('/login')
            .post(this.commonValidator.loginValidator(), this.memberController.loginController);
        // forget password router
        this.router.post('/forget-password', this.commonValidator.commonForgetPassInputValidation(), this.memberController.forgetPasswordController);
    }
}
exports.default = MemberAuthRouter;
