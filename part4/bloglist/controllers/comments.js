const commentsRouter = require("express").Router();
const Blog = require("../models/blogs");
const Comment = require("../models/comments")
const jwt = require("jsonwebtoken");

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments);
});

commentsRouter.post("/", async (request, response) => {
  let newComment = request.body;
  const token = request.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(newComment.blogId);

  if (!newComment.comment)
    return response.status(400).json({ error: "missing properties" });

  const comment = new Comment({ comment: newComment.comment, blog: blog._id });

  const savedComment = await comment.save();
  
  console.log(blog)

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
