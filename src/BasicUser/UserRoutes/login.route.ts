import { Request, Response } from "express";
import AbstractRouter from "../../abstract/abstract.router";
import createUserController from './../UserController/create.user.controller';

class LoginRoute extends AbstractRouter {
  private creatUserController = new createUserController();

  constructor() {
    super();
    this.callRouter();
  }


  public callRouter() {

    this.router.route('/login').post(this.creatUserController.userLogin);

  }



}

export default LoginRoute;