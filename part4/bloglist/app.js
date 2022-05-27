const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const { unknownEndpoint, errorHandler, requestLogger } = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to mongoDB')

mongoose.connect(config.mongoUrl)
    .then(result => logger.info('successful connection'))
    .catch(error => logger.error('error trying to connect to mongoDB', error.message))

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app