process.env.NODE_ENV = "test";

const request = require("supertest");
const mongoose = require("mongoose");
const { expect } = require("chai");

const app = require("../server");
const Program = require("../models/Program");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");

describe("Enrollment API Test", function () {

  before(async function () {
    await mongoose.connect(process.env.MONGO_URI);

    await Program.deleteMany({});
    await User.deleteMany({});
    await Enrollment.deleteMany({});

    await Program.create({
      programId: "FTP001",
      name: "Beginner Full Body Workout",
      category: "Strength Training",
      level: "Beginner",
      price: 1999
    });

    await User.create({
      userId: "USR101",
      name: "Arjun Mehta",
      email: "arjun.mehta@example.com"
    });
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("Successful enrollment → 201", async function () {

    const res = await request(app)
      .post("/api/enroll")
      .send({
        userId: "USR101",
        programId: "FTP001"
      });

    expect(res.status).to.equal(201);
    expect(res.body.success).to.equal(true);
  });

  it("Duplicate enrollment → 400", async function () {

    const res = await request(app)
      .post("/api/enroll")
      .send({
        userId: "USR101",
        programId: "FTP001"
      });

    expect(res.status).to.equal(400);
    expect(res.body.success).to.equal(false);
  });

});