import { Router } from "express";
import TransactionRouter from "./TransactionRoutes/transactionRoute";

class RootTransactionRouter {
  public transacRouter = Router();
  private TransactionRouter = new TransactionRouter();
  constructor(){
    this.callRouter();
  }

   private callRouter(){
      this.transacRouter.use('/', this.TransactionRouter.router);
   } 

}

export default RootTransactionRouter;