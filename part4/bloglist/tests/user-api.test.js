const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/users");
const api = supertest(app);

describe("when there is one user initially in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("123", 10);
    const user = new User({
      name: "daniel teste da silva",
      username: "test_daniel",
      password: passwordHash
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

  describe("creation of new user", () => {
    test("succeed with new user", async () => {
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
  
    test("fail when username is shorter than 3 characters", async () => {
      const newUser = {
        username: "12",
        password: "123456",
      };
  
      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
  
      const usersAtDb = await api.get("/api/users/");
      expect(usersAtDb.body.length).toBe(1)
    })
    
    test("fail when password is shorter than 3 characters", async () => {
      const newUser = {
        username: "123456",
        password: "12",
      };
  
      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
  
      const usersAtDb = await api.get("/api/users/");
      expect(usersAtDb.body.length).toBe(1)
    })
    
    test("fail when username is not unique", async () => {
      const newUser = {
        username: "test_daniel",
        password: "123456",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    })
  })

});

afterAll(() => {
  mongoose.connection.close();
});
