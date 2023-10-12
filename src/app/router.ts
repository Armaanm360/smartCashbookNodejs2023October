import { Router } from "express";
import BasicRouter from "../BasicModule/basic.router";
import UserRouter from './../BasicUser/user.router';
import ExpenseRouter from "./BasicExpense/expense.router";
import TransactionRouter from './../Transaction/TransactionRoutes/transactionRoute';
import RootTransactionRouter from "../Transaction/rootTransaction.router";


class RootRouter {

  //this should be public
  public v1Router = Router();
  private basicRouter = new BasicRouter();
  private userRouter =  new UserRouter();
  private createRouter = new ExpenseRouter();
  private TransactionRouter = new RootTransactionRouter();


  //learn about constructor
  //where we define - we make that from scratch
  constructor() {
    this.callV1Router();
  }

  //now call callV1Router
  //which has to be private

  private callV1Router() {

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

export default RootRouter;