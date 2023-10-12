import { allStrings } from '../miscellaneous/constants';
import config from '../../config/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { sendEmailForTraining } from './../../templates/sendEmailForTraining';
import { sendMyEmailOtp } from './../../templates/sendMyEmailOtp';
import { sendEmailForTrainingMaterials } from '../../templates/sendEmailForTrainingMaterials';

class Lib {
  // make hashed password
  public static async hashPass(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * verify password
   */
  public static async compare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // create token
  public static createToken(
    creds: object,
    secret: string,
    maxAge: number | string
  ) {
    return jwt.sign(creds, secret, { expiresIn: maxAge });
  }

  // verify token
  public static verifyToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // generate random Number
  public static otpGenNumber(length: number) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let otp = '';

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 10);

      otp += numbers[randomNumber];
    }

    return otp;
  }

  // generate random Number and alphabet
  public static otpGenNumberAndAlphabet(length: number) {
    let otp = '';

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * allStrings.length);

      otp += allStrings[randomNumber];
    }

    return otp;
  }

  // send email by nodemailer
  public static async sendEmail(
    email: string,
    emailSub: string,
    emailBody: string
  ) {
    try {
      const transporter = nodemailer;

      nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL_SEND_EMAIL_ID,
          pass: config.EMAIL_SEND_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: config.EMAIL_SEND_EMAIL_ID,
        to: email,
        subject: emailSub,
        html: emailBody,
      });

      console.log('Message send: %s', info);

      return true;
    } catch (err: any) {
      console.log({ err });
      return false;
    }
  }

  public static async customSendMail(
    email: string,
    subject: string,
    body: string,
    otp: string
  ) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL_SEND_EMAIL_ID,
          pass: config.EMAIL_SEND_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: config.EMAIL_SEND_EMAIL_ID,
        to: email,
        subject: subject,
        html: sendMyEmailOtp(otp),
      });
      console.log('message sent to' + '-' + info.to);
      return true;
    } catch (err: any) {
      console.log({ err });
      return false;
    }
  }

  public static getAnyMonthFirstDate(month: number) {
    function monthsGetDays(month: number) {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          return 30;
          break;
        case 2:
          return 28;
        default:
          return 0;
          break;
      }
    }

    const year = new Date().getUTCFullYear();
    const amonth = 0 + month;
    const firstday = '01';
    const lastday = monthsGetDays(month);

    const firsdayString: string = `${String(year)}-${String(amonth).padStart(
      2,
      '0'
    )}-${String(firstday).padStart(2, '0')}`;

    const lastDayString: string = `${String(year)}-${String(amonth).padStart(
      2,
      '0'
    )}-${String(lastday).padStart(2, '0')}`;

    return { firsdayString, lastDayString };
  }
}
export default Lib;
