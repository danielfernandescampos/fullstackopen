const bcrypt = require('bcrypt')
const userRouter = require("express").Router();
const User = require("../models/users");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!username || !name || !password)
    return response.status(400).json({ error: "missing properties" });

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    password: passwordHash
  });
  const savedUser = await user.save()
  response.status(201).json(savedUser)
});

// userRouter.delete("/:id", async (request, response) => {
//   const id = request.params.id
//   await User.findByIdAndRemove(id)
//   response.status(204).end()
// })

// userRouter.put("/:id", async (request, response) => {
//   const id = request.params.id
//   const blog = request.body
//   const updatedBlog = await User.findByIdAndUpdate(id, blog, {
//     new: true,
//     runValidators: true,
//     context: 'query',
//   })
//   response.json(updatedBlog)
// })

module.exports = userRouter;
