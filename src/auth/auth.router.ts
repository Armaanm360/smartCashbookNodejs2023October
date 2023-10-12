import TraineeAuthRouter from './router/auth.trainee.router';
import MemberAuthRouter from './router/auth.member.router';
import AdminAuthRouter from './router/auth.admin.router';
import { Router } from 'express';

class AuthRouter {
  public AuthRouter = Router();
  private adminAuthRouter = new AdminAuthRouter();
  private memberAuthRouter = new MemberAuthRouter();
  private traineeAuthRouter = new TraineeAuthRouter();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
    this.AuthRouter.use('/admin', this.adminAuthRouter.router);
    this.AuthRouter.use('/member', this.memberAuthRouter.router);
    this.AuthRouter.use('/trainee', this.traineeAuthRouter.router);
  }
}

export default AuthRouter;
