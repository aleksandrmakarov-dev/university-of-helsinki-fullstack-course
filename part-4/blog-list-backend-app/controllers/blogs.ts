import express, { Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import { Blog } from '../models/blog';
import { User } from '../models/user';

interface BlogCreateRequest {
  title: string;
  author: string;
  url: string;
  likes: string;
  userId: string;
}

// Express router
const router: Router = express.Router();

// MongoDb model to manipulate blogs
const BlogModel: Model<Blog> = require('../models/blog');
const UserModel: Model<User> = require('../models/user');

// GET all blogs
router.get('/', async (req: Request, res: Response) => {
  const existingBlogs: Blog[] = await BlogModel.find();
  res.json(existingBlogs);
});

// POST new blog
router.post('/', async (req: Request, res: Response) => {
  const { title, author, url, likes, userId }: BlogCreateRequest = req.body;

  const user: User | null = await UserModel.findById(userId);

  if (user === null) {
    return res.status(400).json({ error: `user with id = ${userId} not found` });
  }

  const newBlog: Blog = new BlogModel({
    title,
    author,
    url,
    likes,
    user: user.id,
  });
  const createdBlog: Blog = await BlogModel.create(newBlog);

  user.blogs.push(createdBlog);
  await user.save();

  return res.status(201).json(createdBlog);
});

module.exports = router;
