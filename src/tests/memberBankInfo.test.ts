import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
import server from "../server";
import { describe, it } from "mocha";
import generateTokenForMember from "./utils/generateTokenForMember";
chai.use(chaiHttp);

describe("Member Bank Info module suit", () => {
  let baseUrl = "/api/v1/member";

  describe("Valid get Bank Info controller", () => {
    it("should return a bank info", async () => {
      const adminCredential = {
        email: "jobayer.m360ict@gmail.com",
        password: "1234567890",
      };

      const token = await generateTokenForMember(adminCredential);

      let tokenData = token.body.token;

      const res: any = await chai
        .request(server)
        .get(`${baseUrl}/bank-info`)
        .set("Authorization", `Bearer ${tokenData}`);

      const bankInfo = res.body.data;

      assert.isArray(bankInfo, "res should be an array");
      assert.isNumber(bankInfo[0].id, "id should be a number" ?? null);
      assert.isString(bankInfo[0].name, "name should be a string" ?? null);
      assert.isString(bankInfo[0].email, "email should be a string" ?? null);
      assert.isString(bankInfo[0].phone, "phone should be a string" ?? null);
      assert.isString(
        bankInfo[0].address,
        "address should be a string" ?? null
      );
    });
  });

  describe("InValid get Bank Info controller", () => {
    it("should not return a bank info without token", async () => {
      const res: any = await chai.request(server).get(`${baseUrl}/bank-info`);

      const bankInfo = res.body;
      assert.equal(
        bankInfo.message,
        "The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided"
      );
      assert.equal(bankInfo.success, false, "bankinfo success should be false");
    });
  });
});
