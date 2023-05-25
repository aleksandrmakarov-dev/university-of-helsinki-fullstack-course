import express from 'express';
import mongoose from 'mongoose';

const errorHandler = (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: 'malformatted id' });
  } if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: error.message });
};

module.exports = errorHandler;
