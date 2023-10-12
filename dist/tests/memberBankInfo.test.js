"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chai_2 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../server"));
const mocha_1 = require("mocha");
const generateTokenForMember_1 = __importDefault(require("./utils/generateTokenForMember"));
chai_2.default.use(chai_http_1.default);
(0, mocha_1.describe)("Member Bank Info module suit", () => {
    let baseUrl = "/api/v1/member";
    (0, mocha_1.describe)("Valid get Bank Info controller", () => {
        (0, mocha_1.it)("should return a bank info", () => __awaiter(void 0, void 0, void 0, function* () {
            const adminCredential = {
                email: "jobayer.m360ict@gmail.com",
                password: "1234567890",
            };
            const token = yield (0, generateTokenForMember_1.default)(adminCredential);
            let tokenData = token.body.token;
            const res = yield chai_2.default
                .request(server_1.default)
                .get(`${baseUrl}/bank-info`)
                .set("Authorization", `Bearer ${tokenData}`);
            const bankInfo = res.body.data;
            chai_1.assert.isArray(bankInfo, "res should be an array");
            chai_1.assert.isNumber(bankInfo[0].id, "id should be a number" !== null && "id should be a number" !== void 0 ? "id should be a number" : null);
            chai_1.assert.isString(bankInfo[0].name, "name should be a string" !== null && "name should be a string" !== void 0 ? "name should be a string" : null);
            chai_1.assert.isString(bankInfo[0].email, "email should be a string" !== null && "email should be a string" !== void 0 ? "email should be a string" : null);
            chai_1.assert.isString(bankInfo[0].phone, "phone should be a string" !== null && "phone should be a string" !== void 0 ? "phone should be a string" : null);
            chai_1.assert.isString(bankInfo[0].address, "address should be a string" !== null && "address should be a string" !== void 0 ? "address should be a string" : null);
        }));
    });
    (0, mocha_1.describe)("InValid get Bank Info controller", () => {
        (0, mocha_1.it)("should not return a bank info without token", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield chai_2.default.request(server_1.default).get(`${baseUrl}/bank-info`);
            const bankInfo = res.body;
            chai_1.assert.equal(bankInfo.message, "The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided");
            chai_1.assert.equal(bankInfo.success, false, "bankinfo success should be false");
        }));
    });
});
