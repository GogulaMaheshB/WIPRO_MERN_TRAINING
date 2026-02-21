const chai = require("chai");
const request = require("supertest");
const app = require("../server");

const expect = chai.expect;

describe("End to End User Flow", () => {

  let token;
  let playlistId;

  it("User login → Create Playlist → Fetch Songs", async () => {

    // Login
    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "Test@1234"
      });

    expect(login.status).to.equal(200);
    token = login.body.token;

    // Create Playlist
    const create = await request(app)
      .post("/api/playlists")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "E2E Playlist" });

    expect(create.status).to.equal(201);
    playlistId = create.body._id;

    // Fetch Songs
    const songs = await request(app)
      .get("/api/songs");

    expect(songs.status).to.equal(200);
  });

});
