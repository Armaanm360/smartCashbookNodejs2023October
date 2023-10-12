import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminAuthService from '../services/auth.admin.service';
import { ILogin } from '../../common/types/commontypes';

class AdminAuthController extends AbstractController {
  private adminAuthService = new AdminAuthService();

  constructor() {
    super();
  }

  // login controller
  public loginController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, password } = req.body as ILogin;
      const { code, ...data } = await this.adminAuthService.loginService({
        email,
        password,
      });
      res.status(code).json(data);
    }
  );

  // forget password controller
  public forgetPasswordAdminController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { token, email, password } = req.body;

      const { code, ...data } = await this.adminAuthService.forgetService({
        token,
        email,
        password,
      });

      res.status(code).json(data);
    }
  );
}

export default AdminAuthController;
