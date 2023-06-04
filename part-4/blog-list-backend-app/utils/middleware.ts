import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { NotFoundError, UnAuthorizedError, ValidationError } from './custom-errors';

export interface TokenPayload {
  id: string;
  username: string;
}

export interface TokenAuthorizeRequest extends Request {
  user?: TokenPayload;
}

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
    logger.info('malformatted id');
    return res.status(400).json({ error: 'malformatted id' });
  }

  if (error instanceof mongoose.Error.ValidationError || error instanceof ValidationError) {
    logger.info('validation error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  if (error instanceof jwt.TokenExpiredError) {
    logger.info('token expired:', error.message);
    return res.status(401).json({ error: error.message });
  }

  if (error instanceof jwt.JsonWebTokenError) {
    logger.info('token error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  if (error instanceof NotFoundError) {
    logger.info('not found:', error.message);
    return res.status(404).json({ error: error.message });
  }

  if (error instanceof UnAuthorizedError) {
    logger.info('unauthorized:', error.message);
    return res.status(401).json({ error: error.message });
  }

  console.log('internal server error', error.message);
  return res.status(500).json({ error: error.message });
};

const unknownEndpoint = (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(404).json({ error: 'endpoint not found' }).end();
};

const userExtractor = async (req: TokenAuthorizeRequest, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    const token: string = authorization.substring(7, authorization.length);
    const secret = process.env.SECRET;

    if (secret && token) {
      const tokenPayload: TokenPayload = jwt.verify(token, secret) as TokenPayload;
      req.user = tokenPayload;
    } else {
      req.user = undefined;
    }
  }
  next();
};

module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint,
  userExtractor,
};
