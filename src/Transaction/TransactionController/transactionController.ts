import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import TransService from '../TransactionService/transactionService';

class TransactionController extends AbstractController {
  private createTransService = new TransService();

  constructor() {
    super();
  }

  public createTrans = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const payload = req.body.data;

      // console.log(req.body,'npasdlihfkljasdh');

      const { code, ...data } =
        await this.createTransService.createServiceTrans(payload);

      res.status(code).json(data);
    }
  );

  public listTrans = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { userid } = req.params;
      const { code, ...data } = await this.createTransService.listServiceTrans(
        userid
      );
      res.status(code).json(data);
    }
  );

  public getPackages = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { userid } = req.params;
      const { code, ...data } = await this.createTransService.listPackages();
      res.status(code).json(data);
    }
  );

  public createPayment = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const payload = req.body;
      const { code, ...data } = await this.createTransService.createPayment(
        payload
      );
      res.status(code).json(data);
    }
  );
}

export default TransactionController;
