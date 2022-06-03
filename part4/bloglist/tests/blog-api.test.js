const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");

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
  const promiseArray = initialBlogs.map((blog) => new Blog(blog).save());
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
  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("Go To Statement Considered Harmful");
});

test("the unique identifier of a blog is named id", async () => {
  const response = await api.get("/api/blogs/");
  response.body.map((blog) => expect(blog.id).toBeDefined());
});

test("verify that HTTP POST creates a blog", async () => {
  const mockBlog = {
    title: "React attack",
    author: "Bruce Lee",
    url: "sdhfdiosufjds",
    likes: 99,
  };
  await api
    .post("/api/blogs/")
    .send(mockBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);
  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(contents).toContain(mockBlog.title);
});

test("if the likes property is missing from request, the default should be 0", async () => {
  const mockBlog = {
    title: "React attack",
    author: "Bruce Lee",
    url: "sdhfdiosufjds",
  };
  const response = await api
    .post("/api/blogs/")
    .send(mockBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("should return 400 if title or url properties are missing at post request", async () => {
  const mockBlog = {
    title: "React attack",
    author: "Bruce Lee",
  };
  await api.post("/api/blogs/").send(mockBlog).expect(400)
  const response = await api.get("/api/blogs/")
  expect(response.body).toHaveLength(initialBlogs.length)
});

afterAll(() => {
  mongoose.connection.close();
});
