"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const create_expense_controller_1 = __importDefault(require("../ExpenseController/create.expense.controller"));
class CreateExpense extends abstract_router_1.default {
    constructor() {
        super();
        this.createExpense = new create_expense_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router.route('/create').post(this.createExpense.createExpense);
        this.router.route('/list/:id').get(this.createExpense.getExpenseList);
    }
}
exports.default = CreateExpense;
