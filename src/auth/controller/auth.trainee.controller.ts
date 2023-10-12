import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import { ILogin } from '../../common/types/commontypes';
import TraineeAuthService from '../services/auth.trainee.service';

class TraineeAuthController extends AbstractController {
  private traineeAuthService = new TraineeAuthService();

  constructor() {
    super();
  }

  // login controller
  public loginController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, password } = req.body as ILogin;
      const { code, ...data } = await this.traineeAuthService.loginService({
        email,
        password,
      });
      res.status(code).json(data);
    }
  );

  // forget password controller
  public forgetPasswordController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { token, email, password } = req.body;

      const { code, ...data } = await this.traineeAuthService.forgetService({
        token,
        email,
        password,
      });

      res.status(code).json(data);
    }
  );
}

export default TraineeAuthController;
