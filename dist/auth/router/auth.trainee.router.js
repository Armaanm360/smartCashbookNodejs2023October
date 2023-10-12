"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const auth_trainee_controller_1 = __importDefault(require("../controller/auth.trainee.controller"));
class TraineeAuthRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.traineeAuthController = new auth_trainee_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // login router
        this.router
            .route('/login')
            .post(this.commonValidator.loginValidator(), this.traineeAuthController.loginController);
        // forget password router
        this.router.post('/forget-password', this.commonValidator.commonForgetPassInputValidation(), this.traineeAuthController.forgetPasswordController);
    }
}
exports.default = TraineeAuthRouter;
