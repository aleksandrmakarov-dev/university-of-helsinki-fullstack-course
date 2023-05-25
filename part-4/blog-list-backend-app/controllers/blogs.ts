import express, { NextFunction, Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import { Blog } from '../models/blog';

// Express router
const router: Router = express.Router();

// MongoDb model to manipulate blogs
const BlogModel: Model<Blog> = require('../models/blog');

// GET all blogs
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  BlogModel.find()
    .then((result: Blog[]) => {
      return res.json(result);
    })
    .catch((error: Error) => next(error));
});

// POST new blog
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const blog: Blog = req.body;
  BlogModel.create(blog)
    .then((result: Blog) => {
      return res.json(result);
    })
    .catch((error: Error) => next(error));
});

module.exports = router;
