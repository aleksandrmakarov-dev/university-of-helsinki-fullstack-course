import express, { Application, Router } from 'express';

const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app: Application = express();
require('express-async-errors');

// Routers initialization
const notesRouter: Router = require('./controllers/notes');
const usersRouter: Router = require('./controllers/users');
const authRouter: Router = require('./controllers/auth');

mongoose.set('strictQuery', false);
logger.info('connecting to:', config.MONGODB_URI);

// Establish connection
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error: Error) => {
    logger.error('error connecting to MongoDB', error.message);
    process.exit(1);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/notes', middleware.extractUser, notesRouter);
app.use('/api/auth', authRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
