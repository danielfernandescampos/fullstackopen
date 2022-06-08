const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/users");
const api = supertest(app);

describe("when there is one user initially in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = bcrypt.hash("123", 10);
    const user = new User({
      name: "daniel teste da silva",
      username: "test_daniel",
    });
    await user.save();
  });

  test("initial users are returned as json", async () => {
    const users = await api
      .get("/api/users/")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(users.body.length).toBe(1);
  }, 10000);

  test("creation succeed with new user", async () => {
    const newUser = {
      name: "daniel teste da silva",
      username: "test_daniel_2",
      password: "123456",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await api.get("/api/users/");
    expect(usersAtEnd.body).toHaveLength(2);

    const usernames = usersAtEnd.body.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
