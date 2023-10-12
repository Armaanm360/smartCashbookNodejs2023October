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
const mocha_1 = require("mocha");
const server_1 = __importDefault(require("../server"));
const path_1 = __importDefault(require("path"));
chai_2.default.use(chai_http_1.default);
// =========== constant ========== //
const baseUrl = "/api/v1/admin";
// ============ end ============//
(0, mocha_1.describe)("training suit", () => {
    let token = "";
    //   get token
    (0, mocha_1.it)("should get token", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminCreds = {
            email: "jobayer.m360ict@gmail.com",
            password: "1234567890",
        };
        const res = yield chai_2.default
            .request(server_1.default)
            .post("/api/v1/auth/admin/login")
            .send(adminCreds);
        console.log("res", res.body);
        (0, chai_1.expect)(res).to.have.status(200);
        (0, chai_1.expect)(res.body.success).to.equal(true);
        token = res.body.token;
    }));
    //   create a new training
    (0, mocha_1.it)("should create a new training", () => __awaiter(void 0, void 0, void 0, function* () {
        const trainingInput = {
            title: faker_1.faker.lorem.sentence(),
            start_date: faker_1.faker.date.future().toISOString().split("T")[0],
            duration: "40hrs",
            details: faker_1.faker.lorem.paragraph(),
            trainer_name: faker_1.faker.person.firstName(),
            trainer_details: faker_1.faker.person.bio(),
            trainer_remuneration: faker_1.faker.number.float(),
            training_cover_photo: faker_1.faker.image.avatar(),
            training_members: JSON.stringify([1]),
        };
        const training_cover_photo = path_1.default.join(__dirname, "../tests/image/a.webp");
        const trainer_photo = path_1.default.join(__dirname, "../tests/image/a.webp");
        const res = yield chai_2.default
            .request(server_1.default)
            .post(`${baseUrl}/training`)
            .attach("trainer_photo", trainer_photo, "a.webp")
            .attach("training_cover_photo", training_cover_photo, "a.webp")
            .type("form")
            .set("Authorization", `Bearer ${token}`)
            .field(trainingInput);
        (0, chai_1.expect)(res).to.have.status(201);
        (0, chai_1.expect)(res.body.success).to.equal(true);
    }));
    //   get all training
    (0, mocha_1.it)("should get all training with status and date range", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield chai_2.default
            .request(server_1.default)
            .get(`${baseUrl}/training?status=all`)
            .set("Authorization", `Bearer ${token}`);
        (0, chai_1.expect)(res).to.have.status(200);
    }));
});
