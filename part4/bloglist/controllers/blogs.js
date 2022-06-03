const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  let newBlog = request.body;
  if (!request.body.likes) newBlog = { ...newBlog, likes: 0 };
  if (!newBlog.url || !newBlog.title)
    return response.status(400).json({ error: "missing properties" });
  const blog = new Blog(newBlog);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
