import { Request, Response } from "express";
import AbstractRouter from "../../abstract/abstract.router";

class CrudBasicRouter extends AbstractRouter {

  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router.route("/insert").get((req: Request, res: Response) => {
      res.send('Hello This Is Armaan THe beaby boy');
    });
  }

}

export default CrudBasicRouter;