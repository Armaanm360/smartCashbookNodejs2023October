import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
import app from "../server";
import { describe, it } from "mocha";
chai.use(chaiHttp);

describe("Members suit", () => {
  it("should test", async () => {
    const test = faker.number.int();

    assert.isNumber(test);
  });

  it("should test for string", async () => {
    const res = await chai.request(app).get("/api/v1/member/profile");

    console.log("res", res.body);
  });
});
