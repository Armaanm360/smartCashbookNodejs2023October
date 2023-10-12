import { Request, Response } from 'express';
import AbstractRouter from '../../../abstract/abstract.router';
import CreateExpenseController from '../ExpenseController/create.expense.controller';

class CreateExpense extends AbstractRouter {
  private createExpense = new CreateExpenseController();
  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router.route('/create').post(this.createExpense.createExpense);
    this.router.route('/list/:id').get(this.createExpense.getExpenseList);
  }
}

export default CreateExpense;
