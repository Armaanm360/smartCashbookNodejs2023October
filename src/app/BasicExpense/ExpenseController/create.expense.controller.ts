import { Request, Response } from 'express';
import AbstractController from '../../../abstract/abstract.controller';
import { CreatingExpense } from './../utils/expense.types';
import CreateExpenseService from '../ExpenseService/create.expense.service';

class CreateExpenseController extends AbstractController {
  constructor() {
    super();
  }

  private creatingNewExpense = new CreateExpenseService();

  public createExpense = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      //making sure the types
      const { user_id, category_id, amount, transaction_date, description } =
        req.body;

      const { code, ...data } = await this.creatingNewExpense.createNewExpense({
        user_id,
        category_id,
        amount,
        transaction_date,
        description,
      });

      res.status(code).json(data);

      // const{code,...data} = await thi
    }
  );

  public getExpenseList = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { daterange, startdate, enddate, selectmonth } = req.query;
      const expense = await this.creatingNewExpense.getAllExpense(
        Number(id),
        String(daterange),
        String(startdate),
        String(enddate),
        Number(selectmonth)
      );

      res.status(201).json(expense);
    }
  );
}

export default CreateExpenseController;
