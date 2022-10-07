require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers")
const typeDefs = require("./typeDefs")
const context = require("./context")
const mongoose = require('mongoose')

console.log('connecting to MongoDB')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connection to MongoDB:', error.message))


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});