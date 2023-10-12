import AbstractService from '../../abstract/abstract.service';
import Lib from '../../utils/lib/lib';
import { CreatingUser } from '../utils/user.types';

class Otpservice extends AbstractService {
  constructor() {
    super();
  }

  //send otp service
  public async otpServiceMethod(email: string) {
    const otp = Lib.otpGenNumber(6);
    const ifres = await this.db('email_verification_table')
      .where('email', email)
      .first()
      .count();

    const findRow = ifres['count(*)'];

    if (Number(findRow) > 0) {
      return {
        success: false,
        code: 401,
        message: 'User Already Ase',
      };
    } else {
      const res = await this.db('email_verification_table').insert({
        email,
        otp,
      });

      // Lib.customSendMail(email, 'One Time Password (Otp)', 'this is otp', otp);

      if (res.length) {
        return {
          success: true,
          code: 201,
          message: 'Otp Sent Successfully',
          data: {
            email,
            otp,
          },
        };
      } else {
        return {
          success: false,
          code: 401,
          message: 'data not found',
        };
      }
    }
  }

  //check otp service
  public async otpCheckServiceMethod(otp_email: string, otp_chek: string) {
    const ifres = await this.db('email_verification_table')
      .where('email', otp_email)
      .andWhere('status', 'sendotp')
      .andWhere('otp', otp_chek)
      .first()
      .count();

    const getId = await this.db('email_verification_table')
      .where('email', otp_email)
      .andWhere('status', 'sendotp')
      .andWhere('otp', otp_chek)
      .first();
    const findRow = ifres['count(*)'];
    if (Number(findRow) > 0) {
      const res = await this.db('email_verification_table')
        .where('email_verify_id', getId['email_verify_id'])
        .update({ status: 'checked' });

      // Lib.customSendMail(email, 'One Time Password (Otp)', 'this is otp', otp);

      if (res) {
        return {
          success: true,
          code: 201,
          message: 'Otp Check Successfully',
        };
      } else {
        return {
          success: false,
          code: 401,
          message: 'data not found',
        };
      }
    } else {
      return {
        success: false,
        code: 401,
        message: 'Otp Not Matched',
      };
    }
  }

  //forget check user

  public async otpForgetService(email: string) {
    const ifres = await this.db('users').where('email', email).first().count();
    const ifalready = await this.db('email_verification_table')
      .where('email', email)
      .first()
      .count();

    const findRow = ifres['count(*)'];

    if (Number(findRow) < 0) {
      return {
        success: false,
        code: 401,
        message: 'No user Found',
      };
    } else {
      const otpreal = Lib.otpGenNumber(6);
      await this.db('email_verification_table').insert({
        email: email,
        otp: otpreal,
        action: 'ForgetPassword',
      });
      Lib.customSendMail(email, 'Forget Password Otp', '', otpreal);
    }

    console.log(findRow);

    return {
      success: true,
      code: 201,
      data: { findRow },
    };
  }

  //forget check user

  public async otpForgetServiceCrossCheck(email: string, user_otp: string) {
    const ifres = await this.db('email_verification_table')
      .where('email', email)
      .andWhere('action', 'ForgetPassword')
      .first()
      .count();

    const findRow = ifres['count(*)'];

    // console.log(findRow);

    // console.log(user_otp);

    if (Number(findRow) === 0) {
      return {
        success: false,
        code: 401,
        message: 'No Otp Found',
      };
    } else {
      const match = await this.db('email_verification_table')
        .where('email', email)
        .andWhere('otp', user_otp)
        .first()
        .count();

      const findRowMatch = match['count(*)'];
      if (Number(findRowMatch) === 1) {
        await this.db('email_verification_table')
          .where('email', email)
          .delete();

        return {
          success: true,
          code: 201,
          message: 'Otp Matched Successfully',
        };
      } else {
        return {
          success: false,
          code: 401,
          message: 'Wrong Otp Entered',
        };
      }
    }
  }

  public async forgetchangePassword(email: string, password: string) {
    const ifres = await this.db('users').where('email', email).first().count();

    const findRow = ifres['count(*)'];

    if (Number(findRow) === 0) {
      return {
        success: false,
        code: 401,
        message: 'No User Found',
      };
    } else {
      const hashPas = await Lib.hashPass(password);
      const change = await this.db('users')
        .where('email', email)
        .update({ password: hashPas });

      return {
        success: true,
        code: 201,
        message: 'Password Changed Successfully',
      };
    }
  }

  //change password

  public async changePasswordInsideCheck(
    email: string,
    password: string,
    changed_password: string
  ) {
    const checkUser = await this.db('users').select('*').where({ email });

    //checking if user a
    if (!checkUser.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    const { password: hashPass, ...rest } = checkUser[0];

    const checkPass = await Lib.compare(password, hashPass);

    if (checkPass == false) {
      return {
        success: false,
        code: 401,
        message: 'You have entered wrong password',
      };
    } else {
      const newPassword = await Lib.hashPass(changed_password);

      const changedPassword = await this.db('users')
        .where({ email })
        .update({ password: newPassword });

      return {
        success: true,
        code: 201,
        message: 'Password Changed Successfully',
      };
    }

    //change password
  }
}

export default Otpservice;
