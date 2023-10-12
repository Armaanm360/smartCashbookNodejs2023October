import ResMsg from '../../utils/miscellaneous/responseMessage';
import StatusCode from '../../utils/miscellaneous/statusCode';
import CommonAbstractController from '../commonAbstract/common.abstract.controller';
import CommonService from '../commonService/common.service';
import { Request, Response } from 'express';

class CommonController extends CommonAbstractController {
  private commonService = new CommonService();
  constructor() {
    super();
  }

  // send email otp
  public sendEmailOtpController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, type } = req.body;

      let table = '';
      let field = '';
      let otpFor = '';

      switch (type) {
        case 'forget_admin':
          table = 'user_admin';
          field = 'email';
          otpFor = 'Admin Reset Password';
          break;
        case 'forget_member':
          table = 'user_member';
          field = 'email';
          otpFor = 'Member Reset Password';
          break;
        case 'forget_trainee':
          table = 'user_trainee';
          field = 'email';
          otpFor = 'Trainee Reset Password';
          break;

        default:
          break;
      }

      const obj = { email, type, otpFor };

      let data = {
        success: false,
        code: StatusCode.HTTP_BAD_REQUEST,
        message: 'Something is wrong',
      };

      if (type.startsWith('forget')) {
        const checkUser = await this.commonService.checkUserByUniqueKey({
          table,
          field,
          value: email,
        });

        if (checkUser) {
          data = await this.commonService.sendOtpToEmailService(obj);
        } else {
          data = {
            success: false,
            code: StatusCode.HTTP_NOT_FOUND,
            message: ResMsg.NOT_FOUND_USER_WITH_EMAIL,
          };
        }
      } else {
        data = await this.commonService.sendOtpToEmailService(obj);
      }

      const { code, ...rest } = data;

      res.status(code).json(rest);
    }
  );

  // match email otp
  public matchEmailOtpController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, otp, type } = req.body;
      const { code, ...data } = await this.commonService.matchEmailOtpService({
        email,
        otp,
        type,
      });

      res.status(code).json(data);
    }
  );
}

export default CommonController;
