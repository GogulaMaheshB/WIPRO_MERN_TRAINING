const chai = require("chai");
const request = require("supertest");
const app = require("../server");

const expect = chai.expect;

let token;
let playlistId;

describe("Playlist API Tests", () => {

  before(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "Test@1234"
      });

    token = res.body.token;
  });

  it("Should create playlist", async () => {
    const res = await request(app)
      .post("/api/playlists")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Playlist" });

    expect(res.status).to.equal(201);
    playlistId = res.body._id;
  });

  it("Should get playlists", async () => {
    const res = await request(app)
      .get("/api/playlists")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

});
