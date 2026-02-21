const chai = require("chai");
const request = require("supertest");
const app = require("../server"); 

const expect = chai.expect;

describe("Auth API Tests", () => {

  it("Should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        phone: "9999999999",
        password: "Test@1234"
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message");
  });

  it("Should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "Test@1234"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

});
