let request = require("supertest");
let { expect } = require("chai");
let app = require("../index");

describe("BloodLink API Testing", () => {
  it("should check server status", async () => {
    let response = await request(app).get("/");
    expect(response.status).to.equal(200);
    expect(response.text).to.equal("BloodLink Server is running");
  });

  it("should get blood groups", async () => {
    let response = await request(app).get("/bloodgroups");
    expect(response.status).to.equal(200);
  });
});