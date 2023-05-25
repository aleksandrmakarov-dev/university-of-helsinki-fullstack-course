import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

const logger = require('./logger');

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof mongoose.Error.CastError) {
    console.log('malformatted id');
    return res.status(400).json({ error: 'malformatted id' });
  }
  if (error instanceof mongoose.Error.ValidationError) {
    console.log('validation error:', error.message);
    return res.status(400).json({ error: error.message });
  }
  console.log('internal server error');
  return res.status(500).json({ error: error?.message });
};

const unknownEndpoint = (_req: Request, res: Response) => {
  return res.status(404).send({ error: 'endpoint not found' });
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};
