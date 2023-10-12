"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../app/database");
// import ManageFile from '../../utils/lib/manageFile';
class CommonAbstractServices {
    constructor() {
        this.db = database_1.db;
        //public manageFile = new ManageFile();
    }
}
exports.default = CommonAbstractServices;
