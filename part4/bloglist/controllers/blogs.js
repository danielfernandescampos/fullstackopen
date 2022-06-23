const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  let newBlog = request.body;
  const token = request.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!request.body.likes) newBlog = { ...newBlog, likes: 0 };
  if (!newBlog.url || !newBlog.title)
    return response.status(400).json({ error: "missing properties" });

  const blog = new Blog({ ...newBlog, user: user._id });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  // check if user is authorized
  const token = request.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  // check if blog's author is who wants to delete
  const blogToDelete = await Blog.findById(id);
  if (blogToDelete.user.toString() !== decodedToken.id)
    return response
      .status(401)
      .json({ error: "can only delete you own blogs" });

  // delete blog
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
