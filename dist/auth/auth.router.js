"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_trainee_router_1 = __importDefault(require("./router/auth.trainee.router"));
const auth_member_router_1 = __importDefault(require("./router/auth.member.router"));
const auth_admin_router_1 = __importDefault(require("./router/auth.admin.router"));
const express_1 = require("express");
class AuthRouter {
    constructor() {
        this.AuthRouter = (0, express_1.Router)();
        this.adminAuthRouter = new auth_admin_router_1.default();
        this.memberAuthRouter = new auth_member_router_1.default();
        this.traineeAuthRouter = new auth_trainee_router_1.default();
        this.callRouter();
    }
    callRouter() {
        this.AuthRouter.use('/admin', this.adminAuthRouter.router);
        this.AuthRouter.use('/member', this.memberAuthRouter.router);
        this.AuthRouter.use('/trainee', this.traineeAuthRouter.router);
    }
}
exports.default = AuthRouter;
