import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

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
    logger.error('malformatted id');
    return res.status(400).json({ error: 'malformatted id' });
  }
  if (error instanceof mongoose.Error.ValidationError) {
    logger.error('validation error:', error.message);
    return res.status(400).json({ error: error.message });
  }
  if (error instanceof jwt.JsonWebTokenError) {
    logger.error('jwt token error', error.message);
    return res.status(400).json({ error: error.message });
  }
  logger.error('internal server error');
  return res.status(500).json({ error: error?.message });
};

const unknownEndpoint = (_req: Request, res: Response) => {
  return res.status(404).send({ error: 'endpoint not found' });
};

export interface TokenPayload {
  id: string;
  username: string;
}

export interface AuthorizeRequest extends Request {
  user?: TokenPayload;
}

const extractUser = async (req: AuthorizeRequest, _res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    const token: string = authorization.substring(7, authorization.length);

    const secret: string | undefined = process.env.SECRET;
    if (secret && token) {
      req.user = jwt.verify(token, secret) as TokenPayload;
    } else {
      req.user = undefined;
    }
  }
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  extractUser,
};
