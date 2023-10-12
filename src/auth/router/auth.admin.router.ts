import AbstractRouter from '../../abstract/abstract.router';
import AdminAuthController from '../controller/auth.admin.controller';

class AdminAuthRouter extends AbstractRouter {
  private adminAuthController = new AdminAuthController();

  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // login router
    this.router.post(
      '/login',
      this.commonValidator.loginValidator(),
      this.adminAuthController.loginController
    );

    // forget password router
    this.router.post(
      '/forget-password',
      this.commonValidator.commonForgetPassInputValidation(),
      this.adminAuthController.forgetPasswordAdminController
    );
  }
}
export default AdminAuthRouter;
