import { Request, Response } from 'express';
import AbstractRouter from '../../abstract/abstract.router';
import createUserController from '../UserController/create.user.controller';

class RegisterRoutes extends AbstractRouter {
  private createUserController = new createUserController();
  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router
      .route('/register')
      .post(this.createUserController.createUserMeth);
  }
}

export default RegisterRoutes;
