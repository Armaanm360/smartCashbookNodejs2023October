import AbstractServices from '../../abstract/abstract.service';
import CommonService from '../../common/commonService/common.service';
import { ILogin } from '../../common/types/commontypes';
import config from '../../config/config';
import Lib from '../../utils/lib/lib';
import { ILoginRes } from '../utils/types/admin.auth.types';

class TraineeAuthService extends AbstractServices {
  private commonService = new CommonService();
  constructor() {
    super();
  }
  // login service
  public async loginService({ email, password }: ILogin): Promise<ILoginRes> {
    const checkUser = await this.db('user_trainee')
      .select(
        'id',
        'name',
        'user_member_id',
        'designation',
        'email',
        'phone',
        'avatar',
        'password',
        'status'
      )
      .where({ email });

    if (!checkUser.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    const { password: hashPass, ...rest } = checkUser[0];

    const checkPass = await Lib.compare(password, hashPass);

    if (!checkPass) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    const token = Lib.createToken(
      { ...rest, type: 'trainee' },
      config.JWT_SECRET_TRAINEE,
      '24h'
    );

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.LOGIN_SUCCESSFUL,
      data: rest,
      token,
    };
  }

  // forget service
  public async forgetService({
    token,
    email,
    password,
  }: {
    token: string;
    email: string;
    password: string;
  }) {
    const tokenVerify: any = Lib.verifyToken(token, config.JWT_SECRET_TRAINEE);

    if (tokenVerify) {
      const { email: verifyEmail, type } = tokenVerify;

      if (email === verifyEmail && type === 'forget_trainee') {
        const res = await this.commonService.forgetPassword({
          password,
          passField: 'password',
          table: 'user_trainee',
          userEmailField: 'email',
          userEmail: email,
        });

        if (res) {
          return {
            success: true,
            code: this.StatusCode.HTTP_OK,
            message: this.ResMsg.PASSWORD_CHANGED,
          };
        } else {
          return {
            success: true,
            code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
            message: this.ResMsg.PASSWORD_NOT_CHANGED,
          };
        }
      } else {
        return {
          success: false,
          code: this.StatusCode.HTTP_BAD_REQUEST,
          message: this.ResMsg.HTTP_BAD_REQUEST,
        };
      }
    } else {
      return {
        success: false,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
        message: this.ResMsg.HTTP_UNAUTHORIZED,
      };
    }
  }
}

export default TraineeAuthService;
