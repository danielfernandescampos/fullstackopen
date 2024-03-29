const logger = require("../utils/logger");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(`${error.name}: ${error.message}`);
  if (error.name === "CastError") {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === "ObjectParameterError") {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method, request.path);
  logger.info("Body:  ", request.body);
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
};
