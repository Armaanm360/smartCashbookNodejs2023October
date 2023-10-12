import { db } from "../app/database";
import ManageFile from "../utils/lib/manageFile";
import ResMsg from "../utils/miscellaneous/responseMessage";
import StatusCode from "../utils/miscellaneous/statusCode";

abstract class AbstractService {
  protected db = db
  public manageFile = new ManageFile();
  public ResMsg = ResMsg;
  public StatusCode = StatusCode;
}

export default AbstractService;