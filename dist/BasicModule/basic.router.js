"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_basic_router_1 = __importDefault(require("./BasicRouter/crud.basic.router"));
class BasicRouter {
    constructor() {
        this.BasicRouter = (0, express_1.Router)();
        this.CrudBasicRouter = new crud_basic_router_1.default();
        this.callRouter();
    }
    callRouter() {
        this.BasicRouter.use("/", this.CrudBasicRouter.router);
    }
}
exports.default = BasicRouter;
