import AbstractRouter from '../../abstract/abstract.router';
import TraineeAuthController from '../controller/auth.trainee.controller';

class TraineeAuthRouter extends AbstractRouter {
  private traineeAuthController = new TraineeAuthController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // login router
    this.router
      .route('/login')
      .post(
        this.commonValidator.loginValidator(),
        this.traineeAuthController.loginController
      );

    // forget password router
    this.router.post(
      '/forget-password',
      this.commonValidator.commonForgetPassInputValidation(),
      this.traineeAuthController.forgetPasswordController
    );
  }
}
export default TraineeAuthRouter;
