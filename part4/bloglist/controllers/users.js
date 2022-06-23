const bcrypt = require('bcrypt');
const userRouter = require("express").Router();
const User = require("../models/users");

userRouter.get("/", async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, url: 1, likes: 1 })
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password)
    return response.status(400).json({ error: "username and password are required" });

  const usernameValidator = username.split('')
  if(usernameValidator.length < 3)
    return response.status(400).json({ error: "username must be bigger than 3 characters" });
  
  const passwordValidator = password.split('')
  if(passwordValidator.length < 3)
    return response.status(400).json({ error: "password must be bigger than 3 characters" });
  
  const existingUser = await User.findOne({ username })
  if(existingUser) 
    return response.status(400).json({ error: "username must be unique" })

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

userRouter.delete("/:id", async (request, response) => {
  const id = request.params.id
  await User.findByIdAndRemove(id)
  response.status(204).end()
})

userRouter.put("/:id", async (request, response) => {
  const id = request.params.id
  const { username, name, password } = request.body;

  if (!username || !password)
    return response.status(400).json({ error: "username and password are required" });
  const existingUser = await User.findOne({ username })

  if(existingUser) return response.status(400).json({ error: "username must be unique" })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = {
    username,
    name,
    password: passwordHash
  };

  const updatedUser = await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  response.json(updatedUser)
})

module.exports = userRouter;
