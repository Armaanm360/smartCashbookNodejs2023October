//import CommonService from '../common/commonService/common.service';
import Wrapper from '../common/middlewares/assyncWrapper/wrapper';

import CustomError from '../utils/lib/customEror';
import ResMsg from '../utils/miscellaneous/responseMessage';
import StatusCode from '../utils/miscellaneous/statusCode';

abstract class AbstractController {
  protected asyncWrapper: Wrapper;
  constructor() {
    this.asyncWrapper = new Wrapper();
  }
  public StatusCode = StatusCode;
  protected error(message?: string, status?: number, type?: string) {
    throw new CustomError(
      message || ResMsg.HTTP_INTERNAL_SERVER_ERROR,
      status || StatusCode.HTTP_INTERNAL_SERVER_ERROR,
      type || 'Internal server Error'
    );
  }

  //public createAudit = new CommonService().createAuditTrailService;
}
export default AbstractController;
