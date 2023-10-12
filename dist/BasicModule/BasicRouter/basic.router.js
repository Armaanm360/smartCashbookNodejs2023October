"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BasicRouter {
    constructor() {
        this.BasicRouter = (0, express_1.Router)();
        this.CrudBasicRouter = new this.CrudBasicRouter();
    }
}
exports.default = BasicRouter;
