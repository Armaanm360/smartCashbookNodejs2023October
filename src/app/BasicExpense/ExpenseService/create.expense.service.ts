import AbstractService from '../../../abstract/abstract.service';
import generateTokenForMember from '../../../tests/utils/generateTokenForMember';
import Lib from '../../../utils/lib/lib';
import { CreatingExpense } from './../utils/expense.types';

class CreateExpenseService extends AbstractService {
  constructor() {
    super();
  }

  public async createNewExpense({
    user_id,
    category_id,
    amount,
    transaction_date,
    description,
  }: CreatingExpense) {
    const res = await this.db('transactions').insert({
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
    } else {
      return {
        success: false,
        code: 401,
        message: 'data not found',
      };
    }
  }

  public async getAllExpense(
    id: number,
    daterange: string,
    startdate: string,
    enddate: string,
    selectmonth: number
  ) {
    // const days = '';
    const today = new Date().toISOString().slice(0, 10);
    function getDays(days: number) {
      const format = new Date(new Date().setDate(new Date().getDate() - days));
      return format.toISOString().slice(0, 10);
    }

    // Lib.customSendMail('armaan.m360ict@gmail.com', 'OTP', 'Otp Sent');
    console.log(Lib.otpGenNumber(6));
    //  console.log({ today }, '2023-07-20');

    const expense = await this.db('transactions')
      .select(
        'transactions.transaction_id',
        'transactions.amount',
        'transactions.transaction_date',
        'transactions.description',
        'categories.category_id',
        'categories.category_type'
      )
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
              Lib.getAnyMonthFirstDate(selectmonth).firsdayString,
              Lib.getAnyMonthFirstDate(selectmonth).lastDayString,
            ]);
          default:
            break;
        }
      });

    let totalProfitLoss = 0;
    expense.forEach((transaction) => {
      if (transaction.category_type === 'EARNING') {
        totalProfitLoss += Number(transaction.amount);
      } else {
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
  }
}

export default CreateExpenseService;
