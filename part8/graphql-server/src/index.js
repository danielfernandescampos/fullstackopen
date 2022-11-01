require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const context = require("./context");
const mongoose = require("mongoose");

const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");

const { execute, subscribe } = require("graphql");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

console.log("connecting to MongoDB");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connection to MongoDB:", error.message));

mongoose.set("debug", true);

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
