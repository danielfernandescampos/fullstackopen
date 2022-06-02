const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs")

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Daniel Lo Nigro",
    likes: 2,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Daniel Lo Nigro",
    likes: 6,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 5,
  },
  {
    title: "First class tests",
    author: "Vanessa Paradis",
    likes: 7,
  },
];

beforeEach(async () => {
    await Blog.deleteMany({});
    const promiseArray = initialBlogs.map(blog => new Blog(blog).save());
    await Promise.all(promiseArray);
}); 

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs/")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs/");
    expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs/");
    const titles = response.body.map(r => r.title);
    expect(titles).toContain("Go To Statement Considered Harmful");
});

afterAll(() => {
  mongoose.connection.close();
});
