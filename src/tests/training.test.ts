import { expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
import { describe, it } from "mocha";
import server from "../server";
import path from "path";
chai.use(chaiHttp);

// =========== constant ========== //
const baseUrl = "/api/v1/admin";

// ============ end ============//

describe("training suit", () => {
  let token: string = "";

  //   get token
  it("should get token", async () => {
    const adminCreds = {
      email: "jobayer.m360ict@gmail.com",
      password: "1234567890",
    };

    const res = await chai
      .request(server)
      .post("/api/v1/auth/admin/login")
      .send(adminCreds);

    console.log("res", res.body);

    expect(res).to.have.status(200);
    expect(res.body.success).to.equal(true);
    token = res.body.token;
  });

  //   create a new training
  it("should create a new training", async () => {
    const trainingInput = {
      title: faker.lorem.sentence(),
      start_date: faker.date.future().toISOString().split("T")[0],
      duration: "40hrs",
      details: faker.lorem.paragraph(),
      trainer_name: faker.person.firstName(),
      trainer_details: faker.person.bio(),
      trainer_remuneration: faker.number.float(),
      training_cover_photo: faker.image.avatar(),
      training_members: JSON.stringify([1]),
    };

    const training_cover_photo = path.join(__dirname, "../tests/image/a.webp");
    const trainer_photo = path.join(__dirname, "../tests/image/a.webp");

    const res = await chai
      .request(server)
      .post(`${baseUrl}/training`)
      .attach("trainer_photo", trainer_photo, "a.webp")
      .attach("training_cover_photo", training_cover_photo, "a.webp")
      .type("form")
      .set("Authorization", `Bearer ${token}`)
      .field(trainingInput);

    expect(res).to.have.status(201);
    expect(res.body.success).to.equal(true);
  });

  //   get all training
  it("should get all training with status and date range", async () => {
    const res = await chai
      .request(server)
      .get(`${baseUrl}/training?status=all`)
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
  });
});
