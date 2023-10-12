import AbstractService from '../../abstract/abstract.service';
import { ILogin } from '../../common/types/commontypes';
import Lib from '../../utils/lib/lib';
import { CreatingUser } from '../utils/user.types';
import CommonService from './../../common/commonService/common.service';


class CreateUserService extends AbstractService {
  constructor() {
    super();
  }
  public async createService({
    username,
    email,
    password,
  }: CreatingUser) {

    const pass = await Lib.hashPass(password);


   const  checkemail = await this.db('users').where('email',email);
   
   if (checkemail.length) {
      return {
        success: false,
        code: 401,
        message: 'User Email Already Used'
      };
   }else{
    const res = await this.db('users').insert({
      username,
      email,
      password :pass,
    });

    if (res.length) {
      return {
        success: true,
        code: 201,
        message: 'User added successfully',
        data: {username,email },
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

  public async loginService({email,password}:ILogin){


    const basic = await this.db('users').select('*').where({ email })

    

  if (!basic.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }else{
          const checkuser = await this.db('users').select('*').where({ email }).join('packages','packages.package_id','=','users.package_activated');

    console.log(basic);
    const getUserPackage = checkuser[0].package_name;
    const getUserPackageId = checkuser[0].package_id;
    const getUserId = checkuser[0].id;
    const getUsername = checkuser[0].username;
     const { password: hashPass, ...rest } = checkuser[0];
    const checkPass = await Lib.compare(password, hashPass);
    if (!checkPass) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    return {
      success: true,
      code: 201,
      message: 'Logged In Successfully',
      data: { getUserId,getUsername,email,getUserPackage,getUserPackageId}
    };
    }



  }
}

export default CreateUserService;
