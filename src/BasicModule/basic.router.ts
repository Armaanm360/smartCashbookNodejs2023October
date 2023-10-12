import { Router } from "express";
import CrudBasicRouter from "./BasicRouter/crud.basic.router";


class BasicRouter {

  public BasicRouter = Router();
  private CrudBasicRouter = new CrudBasicRouter();

  constructor() {
    this.callRouter();
  }
  private callRouter() {

    this.BasicRouter.use("/", this.CrudBasicRouter.router);
  }




}

export default BasicRouter;