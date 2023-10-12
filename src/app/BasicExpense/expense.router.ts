import { Router } from "express";
import CreateExpense from "./ExpenseRouter/create.route";

class ExpenseRouter {
  constructor() {
    this.callRouter();
  }
  public ExpenseRouter = Router();
  private CreateExpenseRouter = new CreateExpense();




  public callRouter() {

    this.ExpenseRouter.use("/", this.CreateExpenseRouter.router);

  }
}

export default ExpenseRouter;