const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  let newBlog = request.body;
  if (!request.body.likes) newBlog = { ...newBlog, likes: 0 };
  if (!newBlog.url || !newBlog.title)
    return response.status(400).json({ error: "missing properties" });
  const blog = new Blog(newBlog);
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  response.json(updatedBlog)

})

module.exports = blogsRouter;
