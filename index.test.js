// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

describe("./musicians endpoint", () => {
  let musicianId;
  //Write your tests here
  test("Testing /musicians endpoint", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    // checking accuracy for first musician in array
    const responseData = JSON.parse(response.text);
    const firstMusician = responseData[0];
    expect(firstMusician).toHaveProperty("id");
    expect(firstMusician.name).toBe("Mick Jagger");
    expect(firstMusician.instrument).toBe("Voice");
  });

  test("Testing /musicians/1 endpoint", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians/1");
    expect(response.statusCode).toBe(200);
    // checking accuracy for first musician in array
    const firstMusician = response.body;
    expect(firstMusician).toHaveProperty("id");
    expect(firstMusician.name).toBe("Mick Jagger");
    expect(firstMusician.instrument).toBe("Voice");
  });

  test("Testing /musicians/2 endpoint", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians/2");
    expect(response.statusCode).toBe(200);
    // checking accuracy for second musician in array
    const secondMusician = response.body;
    expect(secondMusician).toHaveProperty("id");
    expect(secondMusician.name).toBe("Drake");
    expect(secondMusician.instrument).toBe("Voice");
  });

  test("Testing /musicians/3 endpoint", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians/3");
    expect(response.statusCode).toBe(200);
    // checking accuracy for third musician in array
    const firstMusician = response.body;
    expect(firstMusician).toHaveProperty("id");
    expect(firstMusician.name).toBe("Jimi Hendrix");
    expect(firstMusician.instrument).toBe("Guitar");
  });

  test("Returns error if musician not found", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians/4");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Musician not found");
  });

  test("Post a new musician", async () => {
    const newMusician = {
      name: "Adam Levine",
      instrument: "Voice",
    };
    // Sends request to `/musicians` endpoint
    const response = await request(app).post("/musicians").send(newMusician);
    musicianId = response.body.id; // save ID for later tests
    expect(response.statusCode).toEqual(201);
    expect(response.body.name).toEqual("Adam Levine");
    expect(response.body).toEqual(expect.objectContaining(newMusician));
  });

  test("Update a new musician", async () => {
    const updateMusician = {
      instrument: "Guitar",
    };
    // Sends request to `/musicians` endpoint
    const response = await request(app)
      .put(`/musicians/${musicianId}`)
      .send(updateMusician);
    expect(response.statusCode).toEqual(200);
    expect(response.body.instrument).toEqual("Guitar");
    expect(response.body).toEqual(expect.objectContaining(updateMusician));
  });

  test("Update musician that does not exist", async () => {
    const updateMusician = {
      instrument: "Guitar",
    };
    // Sends request to `/musicians` endpoint
    const response = await request(app)
      .put("/musicians/962")
      .send(updateMusician);
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toEqual("Musician not found");
  });

  test("Delete a musician", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).delete(`/musicians/${musicianId}`);
    expect(response.statusCode).toEqual(200);

    // verify that deleted entry is not accessible
    const getDeletedMus = await request(app).get(`/musicians/${musicianId}`);
    expect(getDeletedMus.statusCode).toEqual(404);
  });

  test("Delete musician that does not exist", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).delete("/musicians/962");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toEqual("Musician not found");
  });

  test("Testing Bands endpoint", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/bands");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    // checking accuracy for first band in array
    const firstBand = response.body[0];
    expect(firstBand).toHaveProperty("id");
    expect(firstBand.name).toBe("The Beatles");
    expect(firstBand.genre).toBe("Rock");
  });
});
