"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const create_user_controller_1 = __importDefault(require("./../UserController/create.user.controller"));
class LoginRoute extends abstract_router_1.default {
    constructor() {
        super();
        this.creatUserController = new create_user_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router.route('/login').post(this.creatUserController.userLogin);
    }
}
exports.default = LoginRoute;
