import { Router } from 'express';
import RegisterRoutes from './UserRoutes/register.route';
import LoginRoute from './UserRoutes/login.route';
import SendOtp from './UserRoutes/send.otp.route';

class UserRouter {
  public UserRouter = Router();
  private RegisterUserRouter = new RegisterRoutes();
  private LoginUserRouter = new LoginRoute();
  private OtpUserRouter = new SendOtp();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
    //register router
    this.UserRouter.use('/', this.RegisterUserRouter.router);
    //login router
    this.UserRouter.use('/', this.LoginUserRouter.router);
    //otp router
    this.UserRouter.use('/', this.OtpUserRouter.router);
  }
}

export default UserRouter;
