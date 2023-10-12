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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
const lib_1 = __importDefault(require("../../../utils/lib/lib"));
class CreateExpenseService extends abstract_service_1.default {
    constructor() {
        super();
    }
    createNewExpense({ user_id, category_id, amount, transaction_date, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db('transactions').insert({
                user_id,
                category_id,
                amount,
                transaction_date,
                description,
            });
            if (res.length) {
                return {
                    success: true,
                    code: 201,
                    message: 'Transaction added successfully',
                    data: { user_id, category_id, amount, transaction_date, description },
                };
            }
            else {
                return {
                    success: false,
                    code: 401,
                    message: 'data not found',
                };
            }
        });
    }
    getAllExpense(id, daterange, startdate, enddate, selectmonth) {
        return __awaiter(this, void 0, void 0, function* () {
            // const days = '';
            const today = new Date().toISOString().slice(0, 10);
            function getDays(days) {
                const format = new Date(new Date().setDate(new Date().getDate() - days));
                return format.toISOString().slice(0, 10);
            }
            // Lib.customSendMail('armaan.m360ict@gmail.com', 'OTP', 'Otp Sent');
            console.log(lib_1.default.otpGenNumber(6));
            //  console.log({ today }, '2023-07-20');
            const expense = yield this.db('transactions')
                .select('transactions.transaction_id', 'transactions.amount', 'transactions.transaction_date', 'transactions.description', 'categories.category_id', 'categories.category_type')
                .from('transactions')
                .join('categories', 'transactions.category_id', 'categories.category_id')
                .where('transactions.user_id', id)
                .where(function () {
                //console.log(getDays(365));
                //console.log(firstDateOfJanuary.toISOString().split('T')[0]); // Output: YYYY-MM-DD
                // console.log(new Date().getMonth());
                switch (daterange) {
                    case 'weekly':
                        this.whereBetween('transaction_date', [getDays(7), today]);
                        break;
                    case 'monthly':
                        this.whereBetween('transaction_date', [getDays(30), today]);
                        break;
                    case 'yearly':
                        this.whereBetween('transaction_date', [getDays(365), today]);
                        break;
                    case 'custom':
                        this.whereBetween('transaction_date', [startdate, enddate]);
                        break;
                    case 'specific':
                        this.whereBetween('transaction_date', [
                            lib_1.default.getAnyMonthFirstDate(selectmonth).firsdayString,
                            lib_1.default.getAnyMonthFirstDate(selectmonth).lastDayString,
                        ]);
                    default:
                        break;
                }
            });
            let totalProfitLoss = 0;
            expense.forEach((transaction) => {
                if (transaction.category_type === 'EARNING') {
                    totalProfitLoss += Number(transaction.amount);
                }
                else {
                    totalProfitLoss -= Number(transaction.amount);
                }
            });
            console.log(expense);
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: expense,
                totalProfitLoss: totalProfitLoss,
            };
        });
    }
}
exports.default = CreateExpenseService;
