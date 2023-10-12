import { NextFunction, Request, Response } from "express";
import Lib from "../../../utils/lib/lib";
import TokenService from "../../../utils/lib/tokenService";
import config from "../../../config/config";
import { IAdmin, IMember, ITrainee } from "../../types/commontypes";
import StatusCode from "../../../utils/miscellaneous/statusCode";
import ResMsg from "../../../utils/miscellaneous/responseMessage";
class AuthChecker {
  public tokenService: TokenService;
  constructor() {
    this.tokenService = new TokenService("admin_auth_secret");
  }

  // admin auth checker
  public adminAuthChecker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    }

    const authSplit = authorization.split(" ");

    if (authSplit.length !== 2) {
      return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
        success: false,
        message: ResMsg.HTTP_UNAUTHORIZED,
      });
    }

    const verify = Lib.verifyToken(
      authSplit[1],
      config.JWT_SECRET_ADMIN
    ) as IAdmin;

    if (!verify) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    } else {
      if (verify.type !== "admin" || verify.status === 0) {
        return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
          success: false,
          message: ResMsg.HTTP_UNAUTHORIZED,
        });
      } else {
        req.admin = verify as IAdmin;
        next();
      }
    }
  };

  // member auth checker
  public memberAuthChecker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    }

    const authSplit = authorization.split(" ");
    if (authSplit.length !== 2) {
      return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
        success: false,
        message: ResMsg.HTTP_UNAUTHORIZED,
      });
    }

    const verify = Lib.verifyToken(
      authSplit[1],
      config.JWT_SECRET_MEMBER
    ) as IMember;

    if (!verify) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    } else {
      if (verify.type !== "member" || verify.status === "blacklisted") {
        return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
          success: false,
          message: ResMsg.HTTP_UNAUTHORIZED,
        });
      } else {
        req.member = verify;
        next();
      }
    }
  };

  // trainee auth checker
  public traineeAuthChecker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    }

    const authSplit = authorization.split(" ");
    if (authSplit.length !== 2) {
      return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
        success: false,
        message: ResMsg.HTTP_UNAUTHORIZED,
      });
    }

    const verify = Lib.verifyToken(
      authSplit[1],
      config.JWT_SECRET_TRAINEE
    ) as ITrainee;

    if (!verify) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    } else {
      if (verify.type !== "trainee" || verify.status === 0) {
        return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
          success: false,
          message: ResMsg.HTTP_UNAUTHORIZED,
        });
      } else {
        req.trainee = verify;
        next();
      }
    }
  };


  // servent auth checker
  public serventAuthChecker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    }

    const authSplit = authorization.split(" ");
    if (authSplit.length !== 2) {
      return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
        success: false,
        message: ResMsg.HTTP_UNAUTHORIZED,
      });
    }

    const verify = Lib.verifyToken(
      authSplit[1],
      config.JWT_SECRET_TRAINEE
    ) as ITrainee;

    if (!verify) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    } else {
      if (verify.type !== "trainee" || verify.status === 0) {
        return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
          success: false,
          message: ResMsg.HTTP_UNAUTHORIZED,
        });
      } else {
        req.trainee = verify;
        next();
      }
    }
  };
}

export default AuthChecker;
