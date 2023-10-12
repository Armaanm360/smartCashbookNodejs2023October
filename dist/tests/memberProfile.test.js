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
const faker_1 = require("@faker-js/faker");
const server_1 = __importDefault(require("../server"));
const mocha_1 = require("mocha");
chai_2.default.use(chai_http_1.default);
(0, mocha_1.describe)("Members suit", () => {
    (0, mocha_1.it)("should test", () => __awaiter(void 0, void 0, void 0, function* () {
        const test = faker_1.faker.number.int();
        chai_1.assert.isNumber(test);
    }));
    (0, mocha_1.it)("should test for string", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield chai_2.default.request(server_1.default).get("/api/v1/member/profile");
        console.log("res", res.body);
    }));
});
