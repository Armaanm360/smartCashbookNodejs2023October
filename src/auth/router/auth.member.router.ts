import AbstractRouter from '../../abstract/abstract.router';
import MemberAuthController from '../controller/auth.member.controller';

class MemberAuthRouter extends AbstractRouter {
  private memberController = new MemberAuthController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router
      .route('/login')
      .post(
        this.commonValidator.loginValidator(),
        this.memberController.loginController
      );

    // forget password router
    this.router.post(
      '/forget-password',
      this.commonValidator.commonForgetPassInputValidation(),
      this.memberController.forgetPasswordController
    );
  }
}
export default MemberAuthRouter;
