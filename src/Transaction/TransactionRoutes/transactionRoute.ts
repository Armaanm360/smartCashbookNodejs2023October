import AbstractRouter from '../../abstract/abstract.router';
import TransactionController from '../TransactionController/transactionController';

class TransactionRouter extends AbstractRouter {
  private TransController = new TransactionController();

  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router.route('/').post(this.TransController.createTrans);

    // this.router
    //   .route('/get/:user')
    //    .get(this.TransController.listTrans);
    this.router.route('/:userid').get(this.TransController.listTrans);
    this.router
      .route('/get-packages/all')
      .get(this.TransController.getPackages);

    //creating payment section

    this.router
      .route('/payment/create')
      .post(this.TransController.createPayment);
  }
}

export default TransactionRouter;
