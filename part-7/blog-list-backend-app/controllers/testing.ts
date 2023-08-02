import express, { Router, Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from '../models/user';
import { Blog } from '../models/blog';

const router: Router = express.Router();
const userModel: Model<User> = require('../models/user');
const blogModel: Model<Blog> = require('../models/blog');

router.post('/reset', async (_req: Request, res: Response) => {
  await userModel.deleteMany();
  await blogModel.deleteMany();
  return res.status(204).end();
});

module.exports = router;
