import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import Otpservice from '../UserService/otp.service';

class OtpController extends AbstractController {
  constructor() {
    super();
  }

  private createOtpService = new Otpservice();

  public getOtp = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email } = req.query;

      const otp = await this.createOtpService.otpServiceMethod(String(email));

      res.status(201).json(otp);
    }
  );

  public otpCheck = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { otp_email, otp_check } = req.query;

      const check_email_otp = await this.createOtpService.otpCheckServiceMethod(
        String(otp_email),
        String(otp_check)
      );
      res.status(201).json(check_email_otp);
    }
  );

  public forgetOtp = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email } = req.body;

      const { code, ...data } = await this.createOtpService.otpForgetService(
        email
      );

      res.status(code).json(data);
    }
  );

  public forgetOtpMatch = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, user_otp } = req.body;

      const { code, ...data } =
        await this.createOtpService.otpForgetServiceCrossCheck(
          String(email),
          String(user_otp)
        );

      res.status(code).json(data);
    }
  );

  public forgetchangePassword = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const { code, ...data } =
        await this.createOtpService.forgetchangePassword(
          String(email),
          String(password)
        );

      res.status(code).json(data);
    }
  );

  //change password
  public changePasswordInsideCheck = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, password, changed_password } = req.body;

      const { code, ...data } =
        await this.createOtpService.changePasswordInsideCheck(
          String(email),
          String(password),
          String(changed_password)
        );

      res.status(code).json(data);
    }
  );
}

export default OtpController;
