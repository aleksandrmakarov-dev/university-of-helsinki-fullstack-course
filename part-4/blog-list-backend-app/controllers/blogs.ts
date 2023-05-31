import express, { Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import { Blog } from '../models/blog';

// Express router
const router: Router = express.Router();

// MongoDb model to manipulate blogs
const BlogModel: Model<Blog> = require('../models/blog');

// GET all blogs
router.get('/', async (req: Request, res: Response) => {
  const existingBlogs: Blog[] = await BlogModel.find();
  res.json(existingBlogs);
});

// POST new blog
router.post('/', async (req: Request, res: Response) => {
  const { title, author, url, likes } = req.body;
  const newBlog: Blog = {
    title,
    author,
    url,
    likes,
  };
  const createdBlog: Blog = await BlogModel.create(newBlog);
  res.status(201).json(createdBlog);
});

module.exports = router;
