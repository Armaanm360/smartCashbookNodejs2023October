"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_route_1 = __importDefault(require("./UserRoutes/register.route"));
const login_route_1 = __importDefault(require("./UserRoutes/login.route"));
const send_otp_route_1 = __importDefault(require("./UserRoutes/send.otp.route"));
class UserRouter {
    constructor() {
        this.UserRouter = (0, express_1.Router)();
        this.RegisterUserRouter = new register_route_1.default();
        this.LoginUserRouter = new login_route_1.default();
        this.OtpUserRouter = new send_otp_route_1.default();
        this.callRouter();
    }
    callRouter() {
        //register router
        this.UserRouter.use('/', this.RegisterUserRouter.router);
        //login router
        this.UserRouter.use('/', this.LoginUserRouter.router);
        //otp router
        this.UserRouter.use('/', this.OtpUserRouter.router);
    }
}
exports.default = UserRouter;
