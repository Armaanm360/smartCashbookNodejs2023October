"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = __importDefault(require("../../../abstract/abstract.controller"));
const create_expense_service_1 = __importDefault(require("../ExpenseService/create.expense.service"));
class CreateExpenseController extends abstract_controller_1.default {
    constructor() {
        super();
        this.creatingNewExpense = new create_expense_service_1.default();
        this.createExpense = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            //making sure the types
            const { user_id, category_id, amount, transaction_date, description } = req.body;
            const _a = yield this.creatingNewExpense.createNewExpense({
                user_id,
                category_id,
                amount,
                transaction_date,
                description,
            }), { code } = _a, data = __rest(_a, ["code"]);
            res.status(code).json(data);
            // const{code,...data} = await thi
        }));
        this.getExpenseList = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { daterange, startdate, enddate, selectmonth } = req.query;
            const expense = yield this.creatingNewExpense.getAllExpense(Number(id), String(daterange), String(startdate), String(enddate), Number(selectmonth));
            res.status(201).json(expense);
        }));
    }
}
exports.default = CreateExpenseController;
