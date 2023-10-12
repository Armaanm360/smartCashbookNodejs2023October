import CommonAbstractServices from '../commonAbstract/common.abstract.service';
import Lib from '../../utils/lib/lib';
import config from '../../config/config';
import { sendEmailOtpTemplate } from '../../templates/sendEmailOtp';
import ResMsg from '../../utils/miscellaneous/responseMessage';
import AbstractServices from '../../abstract/abstract.service';

class CommonService extends AbstractServices {
  constructor() {
    super();
  }
  // send otp to email
  public async sendOtpToEmailService(obj: {
    email: string;
    type: string;
    otpFor: string;
  }) {
    return await this.db.transaction(async (trx) => {
      const checkOtp = await this.db('email_otp')
        .select('id', 'hashed_otp', 'tried')
        .andWhere('email', obj.email)
        .andWhere('type', obj.type)
        .andWhere('matched', 0)
        .andWhere('tried', '<', 3)
        .andWhereRaw("ADDTIME(created_at, '0:3:0') > NOW()");

      if (checkOtp.length > 0) {
        return {
          success: false,
          code: this.StatusCode.HTTP_GONE,
          message: this.ResMsg.THREE_TIMES_EXPIRED,
        };
      }

      const otp = Lib.otpGenNumber(6);
      const hashed_otp = await Lib.hashPass(otp);

      const otpCreds = {
        hashed_otp: hashed_otp,
        email: obj.email,
        type: obj.type,
      };

      const sended = await Lib.sendEmail(
        obj.email,
        `Your One Time Password For BAB ${obj.otpFor}`,
        sendEmailOtpTemplate(otp, obj.otpFor)
      );

      console.log({ sended });

      await trx('email_otp').insert(otpCreds);

      if (sended) {
        return {
          success: true,
          code: this.StatusCode.HTTP_OK,
          message: this.ResMsg.OTP_SENT,
          data: {
            email: obj.email,
          },
        };
      } else {
        return {
          success: false,
          code: this.StatusCode.HTTP_UNPROCESSABLE_ENTITY,
          message: this.ResMsg.OTP_NOT_SENT,
        };
      }
    });
  }

  // match email otp
  public async matchEmailOtpService(obj: {
    email: string;
    otp: string;
    type: string;
  }) {
    const table = 'email_otp';
    const checkOtp = await this.db(table)
      .select('id', 'hashed_otp', 'tried')
      .andWhere('email', obj.email)
      .andWhere('type', obj.type)
      .andWhere('matched', 0)
      .andWhereRaw("ADDTIME(created_at, '0:3:0') > NOW()");

    if (!checkOtp.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_FORBIDDEN,
        message: ResMsg.OTP_EXPIRED,
      };
    }
    const { id: email_otp_id, hashed_otp, tried } = checkOtp[0];

    if (tried > 3) {
      return {
        success: false,
        code: this.StatusCode.HTTP_GONE,
        message: this.ResMsg.TOO_MUCH_ATTEMPT,
      };
    }

    const otpValidation = await Lib.compare(obj.otp, hashed_otp);

    if (otpValidation) {
      await this.db(table)
        .update({
          tried: tried + 1,
          matched: 1,
        })
        .where('id', email_otp_id);

      let secret = config.JWT_SECRET_ADMIN;

      switch (obj.type) {
        case 'forget_admin':
          secret = config.JWT_SECRET_ADMIN;
          break;
        case 'forget_member':
          secret = config.JWT_SECRET_MEMBER;
          break;
        case 'forget_trainee':
          secret = config.JWT_SECRET_TRAINEE;
          break;

        default:
          break;
      }

      const token = Lib.createToken(
        {
          email: obj.email,
          type: obj.type,
        },
        secret,
        '5m'
      );

      return {
        success: true,
        code: this.StatusCode.HTTP_ACCEPTED,
        message: this.ResMsg.OTP_MATCHED,
        token,
      };
    } else {
      await this.db(table)
        .update({
          tried: tried + 1,
        })
        .where('id', email_otp_id);

      return {
        success: false,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
        message: this.ResMsg.OTP_INVALID,
      };
    }
  }

  // check user by unique key
  public async checkUserByUniqueKey(obj: {
    table: string;
    field: string;
    value: string;
  }) {
    const check = await this.db(obj.table)
      .select('*')
      .where(obj.field, obj.value);

    if (check.length) {
      return true;
    } else {
      return false;
    }
  }

  // create audit trail service
  public async createAuditTrailService(
    admin_id: number,
    details: string,
    code: number
  ) {
    let status = 1;
    if (code > 299) {
      status = 0;
    }

    const res = await this.db('audit_trail').insert({
      admin_id,
      status,
      details,
    });

    if (res.length) {
      return true;
    } else {
      return false;
    }
  }

  // common forget password change service
  public async forgetPassword({
    table,
    passField,
    password,
    userEmailField,
    userEmail,
  }: IForgetPassProps) {
    const hashedPass = await Lib.hashPass(password);
    const updatePass = await this.db(table)
      .update(passField, hashedPass)
      .where(userEmailField, userEmail);

    return updatePass;
  }
}

export default CommonService;
