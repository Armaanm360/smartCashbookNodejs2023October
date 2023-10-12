import { Request, Response } from 'express';
import AbstractRouter from '../../abstract/abstract.router';
import OtpController from '../UserController/otp.controller';

class SendOtp extends AbstractRouter {
  private otpController = new OtpController();
  constructor() {
    super();
    this.callRouter();
  }
  public callRouter() {
    this.router.route('/otp-get').get(this.otpController.getOtp);
    this.router.route('/otp-check').get(this.otpController.otpCheck);
    this.router
      .route('/otp-forget-password')
      .post(this.otpController.forgetOtp);
    this.router
      .route('/otp-forget-match')
      .post(this.otpController.forgetOtpMatch);
    this.router
      .route('/otp-forget-change-password')
      .post(this.otpController.forgetchangePassword);
    this.router
      .route('/check-password')
      .post(this.otpController.changePasswordInsideCheck);
    // this.router
    //   .route('/check-password')
    //   .post(this.otpController.changePasswordInsideCheck);

    // ok;
  }
}

export default SendOtp;
