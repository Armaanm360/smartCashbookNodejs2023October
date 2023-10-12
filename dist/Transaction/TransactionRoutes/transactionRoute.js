"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const transactionController_1 = __importDefault(require("../TransactionController/transactionController"));
class TransactionRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.TransController = new transactionController_1.default();
        this.callRouter();
    }
    callRouter() {
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
exports.default = TransactionRouter;
