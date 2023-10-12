import AbstractServices from '../../abstract/abstract.service';
import CommonService from '../../common/commonService/common.service';
import { ILogin } from '../../common/types/commontypes';
import config from '../../config/config';
import Lib from '../../utils/lib/lib';
import { ILoginRes } from '../utils/types/admin.auth.types';
class AdminAuthService extends AbstractServices {
  private commonService = new CommonService();
  constructor() {
    super();
  }

  // login service
  public async loginService({ email, password }: ILogin): Promise<ILoginRes> {
    const checkUser = await this.db('user_admin AS ua')
      .select(
        'ua.id',
        'email',
        'ua.name AS admin_name',
        'ua.avatar',
        'ar.name AS role_name',
        'ua.status',
        'ua.password'
      )
      .join('admin_role AS ar', 'ua.role', 'ar.id')
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
      { ...rest, type: 'admin' },
      config.JWT_SECRET_ADMIN,
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
    const tokenVerify: any = Lib.verifyToken(token, config.JWT_SECRET_ADMIN);

    if (tokenVerify) {
      const { email: verifyEmail, type } = tokenVerify;

      if (email === verifyEmail && type === 'forget_admin') {
        const res = await this.commonService.forgetPassword({
          password,
          passField: 'password',
          table: 'user_admin',
          userEmailField: 'email',
          userEmail: email,
        });

        if (res) {
          return {
            success: true,
            code: this.StatusCode.HTTP_OK,
            message: this.ResMsg.HTTP_FULFILLED,
          };
        } else {
          return {
            success: false,
            code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
            message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
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

export default AdminAuthService;
