import { body } from 'express-validator';
import ResMsg from '../../../utils/miscellaneous/responseMessage';

class AdminAuthValidator {
  public adminValidator() {
    return [
      // body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isString(),
      // body('password', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isString(),
    ];
  }
}

export default AdminAuthValidator;
