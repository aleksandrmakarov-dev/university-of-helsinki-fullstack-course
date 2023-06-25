import express, { Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { TokenAuthorizeRequest } from '../utils/middleware';
import { InternalError, NotFoundError, UnAuthorizedError } from '../utils/custom-errors';

interface BlogCreateRequest {
  title: string;
  author: string;
  url: string;
  likes: string;
}

interface BlogUpdateRequest {
  title: string;
  author: string;
  url: string;
  likes: string;
  user: string;
}

// Express router
const router: Router = express.Router();

// MongoDb model to manipulate blogs
const BlogModel: Model<Blog> = require('../models/blog');
const UserModel: Model<User> = require('../models/user');

// GET all blogs
router.get('/', async (req: Request, res: Response) => {
  const existingBlogs: Blog[] = await BlogModel.find().populate('user', { blogs: 0 });
  res.json(existingBlogs);
});

// POST new blog
router.post('/', async (req: TokenAuthorizeRequest, res: Response) => {
  const { title, author, url, likes }: BlogCreateRequest = req.body;

  if (!req.user) {
    throw new UnAuthorizedError('invalid token');
  }

  const user: User | null = await UserModel.findById(req.user.id);

  if (user === null) {
    throw new NotFoundError(`user with id = ${req.user.id} not found`);
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

// DELETE blog

router.delete('/:id', async (req: TokenAuthorizeRequest, res: Response) => {
  if (!req.user) {
    throw new UnAuthorizedError('invalid token');
  }

  const id = req.params.id;

  const blog: Blog | null = await BlogModel.findById(id);

  if (blog === null) {
    throw new NotFoundError(`blog with id = ${id} not found`);
  }

  if (blog.user.toString() !== req.user.id.toString()) {
    throw new UnAuthorizedError('a blog can be deleted only by the user who added the blog');
  }

  const removedBlog: Blog | null = await BlogModel.findByIdAndDelete(id);

  if (removedBlog === null) {
    throw new InternalError('internal error while deleting blog from database');
  }
  return res.status(204).send();
});

// PUT blog
router.put('/:id', async (req: TokenAuthorizeRequest, res: Response) => {
  const { id } = req.params;

  const { title, author, url, user, likes }: BlogUpdateRequest = req.body;

  const updatedBlog: Blog | null = await BlogModel.findByIdAndUpdate(
    id,
    {
      title,
      author,
      url,
      likes,
      user,
    },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  if (updatedBlog === null) {
    throw new NotFoundError(`blog with id = ${id} not found`);
  }
  return res.json(updatedBlog);
});

module.exports = router;
