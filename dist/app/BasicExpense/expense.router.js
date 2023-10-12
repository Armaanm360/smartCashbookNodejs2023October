"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_route_1 = __importDefault(require("./ExpenseRouter/create.route"));
class ExpenseRouter {
    constructor() {
        this.ExpenseRouter = (0, express_1.Router)();
        this.CreateExpenseRouter = new create_route_1.default();
        this.callRouter();
    }
    callRouter() {
        this.ExpenseRouter.use("/", this.CreateExpenseRouter.router);
    }
}
exports.default = ExpenseRouter;
