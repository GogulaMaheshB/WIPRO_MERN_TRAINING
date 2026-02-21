const chai = require("chai");
const request = require("supertest");
const app = require("../server");

const expect = chai.expect;

let token;
let songId;

describe("Song API Tests", () => {

  before(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@gmail.com",
        password: "Admin@123"
      });

    token = res.body.token;
  });

 it("Should fetch all songs", async () => {
  const res = await request(app)
    .get("/api/songs")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).to.equal(200);
  expect(res.body).to.be.an("array");

  if (res.body.length > 0) {
    songId = res.body[0]._id;   
  }
});


});
