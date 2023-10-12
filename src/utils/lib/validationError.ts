import { Result, ValidationError } from 'express-validator';
import StatusCode from '../miscellaneous/statusCode';

interface IError {
  status: number;
  type: string;
}

class ValidationErr extends Error implements IError {
  status: number;
  type: string;

  constructor(error: Result<ValidationError>) {
    console.log(error.array());
    super(error.array()[0].msg);
    (this.status = StatusCode.HTTP_UNPROCESSABLE_ENTITY),
      (this.type = `Invalid input type for '${error.array()[0].param}'`);
  }
}

export default ValidationErr;
