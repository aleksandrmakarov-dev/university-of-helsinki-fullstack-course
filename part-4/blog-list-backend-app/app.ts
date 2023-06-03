import express, { Application, Router } from 'express';
import mongoose from 'mongoose';

const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');

const app: Application = express();
require('express-async-errors');

const blogsRouter: Router = require('./controllers/blogs');
const usersRouter: Router = require('./controllers/users');

mongoose.set('strictQuery', false);
logger.info('connection to:', config.MONGODB_URI);

// Establish connection
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error: Error) => {
    logger.error('failed to connect to MongoDB', error.message);
    process.exit(1);
  });
// Add middlewares
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// Blog routes
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
