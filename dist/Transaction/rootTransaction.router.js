"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionRoute_1 = __importDefault(require("./TransactionRoutes/transactionRoute"));
class RootTransactionRouter {
    constructor() {
        this.transacRouter = (0, express_1.Router)();
        this.TransactionRouter = new transactionRoute_1.default();
        this.callRouter();
    }
    callRouter() {
        this.transacRouter.use('/', this.TransactionRouter.router);
    }
}
exports.default = RootTransactionRouter;
