"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const basic_router_1 = __importDefault(require("../BasicModule/basic.router"));
const user_router_1 = __importDefault(require("./../BasicUser/user.router"));
const expense_router_1 = __importDefault(require("./BasicExpense/expense.router"));
const rootTransaction_router_1 = __importDefault(require("../Transaction/rootTransaction.router"));
class RootRouter {
    //learn about constructor
    //where we define - we make that from scratch
    constructor() {
        //this should be public
        this.v1Router = (0, express_1.Router)();
        this.basicRouter = new basic_router_1.default();
        this.userRouter = new user_router_1.default();
        this.createRouter = new expense_router_1.default();
        this.TransactionRouter = new rootTransaction_router_1.default();
        this.callV1Router();
    }
    //now call callV1Router
    //which has to be private
    callV1Router() {
        //define the first basic route
        this.v1Router.use("/simple", this.basicRouter.BasicRouter);
        //Basic User Router
        this.v1Router.use("/users", this.userRouter.UserRouter);
        //Basic Expense Router
        // this.v1Router.use("/expense", this.TransactionRouter.transacRouter);
        //transaction
        this.v1Router.use("/transaction", this.TransactionRouter.transacRouter);
    }
}
exports.default = RootRouter;
