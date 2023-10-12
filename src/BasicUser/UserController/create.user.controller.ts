import { Response, Request } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import CreateUserService from './../UserService/create.user.service';
import { ILogin } from '../../common/types/commontypes';


class createUserController extends AbstractController {
  constructor() {
    super();
  }
  private CreateUserService = new CreateUserService();
  public createUserMeth = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { username, email, password } = req.body;

      const { code, ...data } = await this.CreateUserService.createService({
        username,
        email,
        password,
      });

      res.status(code).json(data);
    }
  );

  public userLogin = this.asyncWrapper.wrap(
    async (req:Request,res:Response)=>{


    const {email,password} = req.body as ILogin;

    const { code, ...data } = await this.CreateUserService.loginService({
        email,
        password
    })
      res.status(code).json(data);

    }
  )
}

export default createUserController;
